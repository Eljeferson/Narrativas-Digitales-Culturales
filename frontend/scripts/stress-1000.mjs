import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = 'true'] = arg.replace(/^--/, '').split('=');
    return [key, value];
  })
);

const phase = args.phase ?? process.env.STRESS_PHASE ?? 'manual';
const runId = process.env.STRESS_RUN_ID ?? new Date().toISOString().replace(/[:.]/g, '-');
const baseUrl = (process.env.API_BASE_URL ?? 'http://localhost:8080/sistema/api/v1').replace(/\/$/, '');
const totalRecords = Number(process.env.STRESS_RECORDS ?? 1000);
const concurrency = Number(process.env.STRESS_CONCURRENCY ?? 25);
const includeIa = process.env.STRESS_INCLUDE_IA === 'true';
const dryRun = process.env.STRESS_DRY_RUN === 'true';
const testAuthorId = process.env.TEST_AUTHOR_ID ?? '00000000-0000-0000-0000-000000000000';
const resultsDir = join(root, 'tests', 'performance', 'results');

const thresholds = {
  registro: { p95: 3000, errorRate: 0.02 },
  login: { p95: 2000, errorRate: 0.02 },
  instituciones: { p95: 1000, errorRate: 0.02 },
  biblioteca: { p95: 2000, errorRate: 0.02 },
  ia: { p95: 8000, errorRate: 0.05 }
};

function percentile(values, p) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(index, 0), sorted.length - 1)];
}

function average(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function classifyError(status, message) {
  if (status === 0) return 'conexion_o_timeout';
  if (status === 400) return 'payload_invalido';
  if (status === 401 || status === 403) return 'autorizacion';
  if (status === 404) return 'endpoint_o_recurso_no_encontrado';
  if (status === 409) return 'dato_duplicado_o_conflicto';
  if (status === 429) return 'limite_de_solicitudes';
  if (status >= 500) return 'error_servidor';
  if (String(message).toLowerCase().includes('timeout')) return 'timeout';
  return 'error_no_clasificado';
}

function generateStudents(count) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(4, '0');

    return {
      index: index + 1,
      email: `stress.${runId}.${number}@cultura.edu`,
      password: 'Clave-123',
      rol: 'estudiante',
      nombreCompleto: `Estudiante Masivo ${number}`,
      grado: index % 2 === 0 ? '5to de Secundaria' : '6to de Primaria',
      institucion: index % 2 === 0 ? 'Colegio Cultura Viva' : 'Escuela Memoria Andina',
      lenguaMaterna: index % 3 === 0 ? 'Quechua' : 'Castellano',
      regionCultural: index % 2 === 0 ? 'andina' : 'amazonica',
      bio: 'Registro generado para prueba de estres de CulturaStory',
      fotoPerfilUrl: '',
      narrativasPublicadas: 0
    };
  });
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const text = await response.text();

  if (!text) return null;

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  return text;
}

async function timedRequest({ endpoint, method = 'GET', body, timeoutMs = 15000 }) {
  if (dryRun) {
    return {
      ok: true,
      status: 200,
      durationMs: 1,
      response: { dryRun: true, endpoint, method, body }
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      signal: controller.signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });
    const durationMs = Math.round(performance.now() - started);
    const parsed = await parseResponse(response);

    return {
      ok: response.ok,
      status: response.status,
      durationMs,
      response: parsed
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      durationMs: Math.round(performance.now() - started),
      response: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runWithConcurrency(records, task) {
  const results = new Array(records.length);
  let cursor = 0;

  async function worker() {
    while (cursor < records.length) {
      const current = cursor;
      cursor += 1;
      results[current] = await task(records[current], current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, records.length) }, () => worker())
  );

  return results;
}

async function runScenario(name, records, task) {
  console.log(`Ejecutando ${name}: ${records.length} registros, concurrencia ${concurrency}`);
  const started = performance.now();
  const results = await runWithConcurrency(records, task);
  const durations = results.map((result) => result.durationMs);
  const errors = results.filter((result) => !result.ok);
  const threshold = thresholds[name] ?? { p95: Number.POSITIVE_INFINITY, errorRate: 1 };
  const metric = {
    name,
    total: records.length,
    ok: records.length - errors.length,
    failed: errors.length,
    errorRate: errors.length / records.length,
    avgMs: Math.round(average(durations)),
    p90Ms: percentile(durations, 90),
    p95Ms: percentile(durations, 95),
    p99Ms: percentile(durations, 99),
    maxMs: Math.max(...durations),
    totalDurationMs: Math.round(performance.now() - started)
  };

  metric.passed = metric.p95Ms <= threshold.p95 && metric.errorRate <= threshold.errorRate;

  return {
    metric,
    errors: errors.map((error) => ({
      registro: error.registro,
      endpoint: error.endpoint,
      method: error.method,
      status: error.status,
      tipo: classifyError(error.status, error.message),
      email: error.email,
      mensaje: error.message,
      duracionMs: error.durationMs,
      payload: error.payload
    }))
  };
}

function responseMessage(response) {
  if (typeof response === 'string') return response.slice(0, 500);
  if (response?.message) return String(response.message);
  if (response?.error) return String(response.error);
  if (response === null || response === undefined) return '';
  return JSON.stringify(response).slice(0, 500);
}

function buildErrorContext(record, request, result) {
  return {
    ok: result.ok,
    registro: record.index,
    endpoint: request.endpoint,
    method: request.method ?? 'GET',
    status: result.status,
    durationMs: result.durationMs,
    email: record.email,
    message: responseMessage(result.response),
    payload: request.body
  };
}

async function main() {
  await mkdir(resultsDir, { recursive: true });

  const students = generateStudents(totalRecords);
  const scenarios = [];

  scenarios.push(await runScenario('registro', students, async (student) => {
    const request = { endpoint: '/auth/registro', method: 'POST', body: student };
    const result = await timedRequest(request);
    return buildErrorContext(student, request, result);
  }));

  scenarios.push(await runScenario('login', students, async (student) => {
    const request = {
      endpoint: '/auth/login',
      method: 'POST',
      body: {
        email: student.email,
        password: student.password,
        rol: 'estudiante'
      }
    };
    const result = await timedRequest(request);
    return buildErrorContext(student, request, result);
  }));

  scenarios.push(await runScenario('instituciones', students, async (student) => {
    const query = encodeURIComponent(student.institucion.split(' ')[0]);
    const request = { endpoint: `/instituciones?nombre=${query}&grado=${encodeURIComponent(student.grado)}` };
    const result = await timedRequest(request);
    return buildErrorContext(student, request, result);
  }));

  scenarios.push(await runScenario('biblioteca', students, async (student) => {
    const request = { endpoint: `/narrativas/autor/${testAuthorId}` };
    const result = await timedRequest(request);
    return buildErrorContext(student, request, result);
  }));

  if (includeIa) {
    scenarios.push(await runScenario('ia', students, async (student) => {
      const request = { endpoint: `/narrativas/generar-esquema?cultura=${encodeURIComponent(student.regionCultural)}`, timeoutMs: 30000 };
      const result = await timedRequest(request);
      return buildErrorContext(student, request, result);
    }));
  }

  const metrics = scenarios.map((scenario) => scenario.metric);
  const errors = scenarios.flatMap((scenario) => scenario.errors);
  const bottleneck = [...metrics].sort((a, b) => {
    if (b.failed !== a.failed) return b.failed - a.failed;
    return b.p95Ms - a.p95Ms;
  })[0];
  const passed = metrics.every((metric) => metric.passed);

  const summary = {
    phase,
    runId,
    baseUrl,
    totalRecords,
    concurrency,
    includeIa,
    dryRun,
    passed,
    bottleneck,
    metrics,
    errors
  };

  const jsonPath = join(resultsDir, `${phase}-${runId}.json`);
  const mdPath = join(resultsDir, `${phase}-${runId}.md`);
  await writeFile(jsonPath, JSON.stringify(summary, null, 2), 'utf8');
  await writeFile(mdPath, renderMarkdown(summary), 'utf8');

  console.log(`\nReporte JSON: ${jsonPath}`);
  console.log(`Reporte MD: ${mdPath}`);

  if (!passed) {
    console.error('\nLa prueba no paso. Revisa el reporte para corregir errores y cuellos de botella.');
    process.exitCode = 1;
  }
}

function renderMarkdown(summary) {
  const rows = summary.metrics.map((metric) =>
    `| ${metric.name} | ${metric.total} | ${metric.ok} | ${metric.failed} | ${(metric.errorRate * 100).toFixed(2)}% | ${metric.avgMs} | ${metric.p95Ms} | ${metric.p99Ms} | ${metric.passed ? 'PASA' : 'FALLA'} |`
  ).join('\n');

  const errorRows = summary.errors.slice(0, 50).map((error) =>
    `| ${error.registro} | ${error.endpoint} | ${error.status} | ${error.tipo} | ${error.email ?? ''} | ${String(error.mensaje ?? '').replace(/\|/g, '/') } | ${error.duracionMs} |`
  ).join('\n');

  return `# Resultado prueba de estres 1000 - ${summary.phase}

## Configuracion

- Run ID: ${summary.runId}
- API base: ${summary.baseUrl}
- Registros por escenario: ${summary.totalRecords}
- Concurrencia: ${summary.concurrency}
- IA incluida: ${summary.includeIa ? 'si' : 'no'}
- Modo simulacion: ${summary.dryRun ? 'si' : 'no'}
- Resultado general: ${summary.passed ? 'PASA' : 'FALLA'}

## Cuello de botella identificado

- Escenario: ${summary.bottleneck?.name ?? 'N/A'}
- Fallos: ${summary.bottleneck?.failed ?? 0}
- p95: ${summary.bottleneck?.p95Ms ?? 0} ms
- Tasa de error: ${((summary.bottleneck?.errorRate ?? 0) * 100).toFixed(2)}%

## Metricas

| Escenario | Total | Exitosos | Fallidos | Error rate | Avg ms | p95 ms | p99 ms | Estado |
|---|---:|---:|---:|---:|---:|---:|---:|---|
${rows}

## Errores detallados para correccion

Se muestran los primeros 50 errores. El JSON contiene la lista completa.

| Registro | Endpoint | Status | Tipo | Email | Mensaje | Duracion ms |
|---:|---|---:|---|---|---|---:|
${errorRows || '| - | - | - | - | - | Sin errores | - |'}

## Interpretacion

- Si la fase baseline falla, el resultado sirve como evidencia de como estaba el sistema.
- El escenario con mas fallos o mayor p95 se toma como cuello de botella principal.
- Despues de optimizar, ejecuta la fase optimized con la misma cantidad de registros y concurrencia.
- Para aprobar, cada escenario debe quedar bajo sus umbrales de p95 y error rate.
`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
