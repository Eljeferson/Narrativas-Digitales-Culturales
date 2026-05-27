import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = join(root, 'src');
const strict = process.env.QUALITY_STRICT === 'true';
const mojibakePatterns = [/Ã./, /Â./, /â€/, /â€¢/];
const requiredRoutes = [
  'registro-de-estudiante',
  'panel-del-estudiante',
  'panel-del-docente',
  'gestion-de-usuarios',
  'escritorio-del-autor',
  'biblioteca-cultural-explorador',
  'vista-detalle-de-narrativa-publica',
  'panel-de-aprobacion-docente',
  'grabacion-voz-stt',
  'reproductor-narrativa-tts',
  'storyboard-digital-ia'
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return fullPath;
  }));

  return files.flat();
}

const files = (await walk(sourceRoot)).filter((file) =>
  ['.ts', '.html', '.css'].includes(extname(file))
);

const warnings = [];
let inputCount = 0;
let labelCount = 0;

for (const file of files) {
  const content = await readFile(file, 'utf8');
  const relative = file.replace(root, '');

  for (const pattern of mojibakePatterns) {
    if (pattern.test(content)) {
      warnings.push(`Posible texto con codificacion rota en ${relative}`);
      break;
    }
  }

  inputCount += (content.match(/<input\b/g) ?? []).length;
  inputCount += (content.match(/<textarea\b/g) ?? []).length;
  labelCount += (content.match(/<label\b/g) ?? []).length;
}

const routesFile = await readFile(join(sourceRoot, 'app', 'app.routes.ts'), 'utf8');
const missingRoutes = requiredRoutes.filter((route) => !routesFile.includes(`path: '${route}'`));

console.log('Auditoria de calidad frontend CulturaStory');
console.log(`- Rutas criticas revisadas: ${requiredRoutes.length - missingRoutes.length}/${requiredRoutes.length}`);
console.log(`- Campos detectados: ${inputCount}`);
console.log(`- Labels detectados: ${labelCount}`);
console.log(`- Alertas de idioma/codificacion: ${warnings.length}`);

if (warnings.length > 0) {
  console.log('\nAlertas:');
  for (const warning of warnings.slice(0, 20)) {
    console.log(`- ${warning}`);
  }
}

if (missingRoutes.length > 0) {
  console.error(`\nFaltan rutas criticas: ${missingRoutes.join(', ')}`);
  process.exit(1);
}

if (strict && warnings.length > 0) {
  console.error('\nQUALITY_STRICT=true activo: corrige las alertas de codificacion antes de entregar.');
  process.exit(1);
}
