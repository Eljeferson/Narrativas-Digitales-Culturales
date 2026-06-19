# Análisis de Dependencias - Frontend

**Objetivo:** Inventariar y categorizar las dependencias del frontend basándonos en `package.json`.

## 1. Inventario Completo
**Dependencies**:
- `@angular/common` (^21.2.0)
- `@angular/compiler` (^21.2.0)
- `@angular/core` (^21.2.0)
- `@angular/forms` (^21.2.0)
- `@angular/platform-browser` (^21.2.0)
- `@angular/router` (^21.2.0)
- `node` (^24.15.0)
- `rxjs` (~7.8.0)
- `tslib` (^2.3.0)

**DevDependencies**:
- `@angular/build` (^21.2.6)
- `@angular/cli` (^21.2.6)
- `@angular/compiler-cli` (^21.2.0)
- `@tailwindcss/container-queries` (^0.1.1)
- `@tailwindcss/forms` (^0.5.11)
- `@tailwindcss/postcss` (^4.2.2)
- `autoprefixer` (^10.4.27)
- `jsdom` (^28.0.0)
- `postcss` (^8.5.8)
- `prettier` (^3.8.1)
- `tailwindcss` (^4.2.2)
- `typescript` (~5.9.2)
- `vitest` (^4.0.8)

## 2. Dependencias de Producción
- Angular Core y sus paquetes asociados (Common, Compiler, Forms, Router).
- RxJS (Programación reactiva).
- TSLib (Helpers para TypeScript).

## 3. Dependencias de Desarrollo
- Angular CLI y Build tools.
- TailwindCSS, PostCSS y Autoprefixer (Estilos y procesamiento).
- TypeScript compiler.
- Vitest y JSDOM (Framework de testing).
- Prettier (Formateo de código).

## 4. Dependencias Críticas
- **@angular/core**: El núcleo fundamental de la SPA.
- **rxjs**: Fundamental para la gestión de asincronismo y eventos en Angular.
- **tailwindcss**: Responsable de la capa completa de presentación.

## 5. Dependencias Obsoletas / Potenciales Problemas
- El proyecto lista `@angular/core` en versión `21.2.0`. A menos que sea un entorno avanzado, Angular no va por la versión 21 de forma estable en la actualidad. Esto podría ser un indicativo de un prototipo experimental o un error de tipeo generalizado.

## 6. Vulnerabilidades Potenciales
- Usar versiones pre-release o futuras no estables puede acarrear falta de documentación o inestabilidad.

## 7. Dependencias relacionadas con Seguridad
- Ninguna librería de encriptación o manejo de JWT explícita (como `jwt-decode`) en el package.json, lo que indica que se manejan a mano o no se ha implementado en el front.

## 8. Dependencias relacionadas con Persistencia
- Ninguna base de datos embebida (como IndexedDB libraries, Dexie, etc.), lo que significa que el frontend delega todo a backend / localstorage nativo.

## 9. Dependencias relacionadas con APIs
- El consumo de APIs se maneja nativamente con `HttpClient` de `@angular/common/http`. No hay dependencias adicionales como Axios.
