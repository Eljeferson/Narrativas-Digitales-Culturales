# Pruebas frontend CulturaStory

Esta carpeta implementa en el frontend los escenarios del plan de pruebas de CulturaStory.

## Comandos

- `npm run test:unit`: pruebas unitarias con Angular TestBed y Vitest.
- `npm run test:e2e`: flujos criticos con Playwright.
- `npm run test:quality`: auditoria rapida de rutas, labels y posibles problemas de codificacion en textos.
- `npm run test:performance`: escenarios k6 para login, registro, instituciones, biblioteca e IA.
- `npm run stress:baseline`: prueba "como esta" con 1000 registros y reporte de errores.
- `npm run stress:optimized`: repite la misma prueba de 1000 registros despues de optimizar.
- `npm run stress:1000`: ejecucion manual de la prueba masiva.
- `npm run test:all`: unitarias, E2E y calidad.

## Cobertura implementada

- Autenticacion y registro: validaciones, payloads, persistencia de sesion y rutas por rol.
- Perfil de estudiante: pasos del formulario, reglas de contrasena, grado, instituciones y biografia.
- Narrativas: creacion, guardado, consulta por autor, estados y generacion de esquema IA.
- Revision docente: pendientes, aprobacion y rechazo.
- Biblioteca publica: smoke E2E de listado/detalle.
- Calidad: rutas criticas, labels y alertas de textos con codificacion rota.
- Responsive: verificacion E2E contra overflow horizontal en rutas criticas.
- Rendimiento: script k6 con umbrales p95 del plan.

## Variables para rendimiento

`tests/performance/culturastory.k6.js` usa por defecto `http://localhost:8080/sistema/api/v1`.
Se puede cambiar con:

```bash
API_BASE_URL=https://tu-backend/sistema/api/v1 k6 run tests/performance/culturastory.k6.js
```

Tambien acepta `TEST_STUDENT_EMAIL`, `TEST_STUDENT_PASSWORD` y `TEST_AUTHOR_ID`.

## Prueba de estres con 1000 registros y errores detallados

El runner `scripts/stress-1000.mjs` crea 1000 registros sinteticos por ejecucion y prueba:

- registro masivo
- login masivo
- busqueda de instituciones
- consulta de narrativas/biblioteca por autor
- IA opcional

Genera reportes en:

```text
tests/performance/results/
```

Cada reporte incluye:

- metricas por escenario
- p90, p95, p99
- tasa de error
- cuello de botella identificado
- errores detallados por registro, endpoint, status, tipo y mensaje

Ejemplos:

```bash
npm run stress:baseline
npm run stress:optimized
```

Variables utiles:

```bash
API_BASE_URL=http://localhost:8080/sistema/api/v1
STRESS_RECORDS=1000
STRESS_CONCURRENCY=25
STRESS_INCLUDE_IA=false
STRESS_DRY_RUN=false
TEST_AUTHOR_ID=00000000-0000-0000-0000-000000000000
```

Para comparar antes y despues, ejecuta primero `stress:baseline`, aplica optimizaciones y luego `stress:optimized` con la misma configuracion.
