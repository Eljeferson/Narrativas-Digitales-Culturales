# Documentación de implementación de pruebas de CulturaStory

## 1. Propósito

Este documento describe la implementación real de pruebas del proyecto CulturaStory. Su finalidad es dejar evidencia técnica de qué se automatizó, qué herramientas se usaron, cómo se ejecuta cada conjunto de pruebas y qué riesgos del sistema están siendo controlados.

## 2. Alcance implementado

La implementación cubre cinco frentes:

1. Entorno de pruebas.
2. Pruebas funcionales.
3. Pruebas de calidad de código y lógica.
4. Pruebas de rendimiento.
5. Documentación operativa para ejecución y mantenimiento.

## 3. Entorno de pruebas

### Frontend

- Framework: Angular.
- Lenguaje: TypeScript.
- Ejecutor de pruebas: `Vitest`.
- Entorno simulado del navegador: `jsdom`.
- Utilidades de prueba HTTP: `HttpTestingController`.

### Backend

- Framework: Spring Boot.
- Lenguaje: Java 21.
- Ejecutor de pruebas: `JUnit 5`.
- Estrategia de aislamiento: dobles de prueba en memoria para repositorios y servicio de IA.

### Rendimiento

- Herramienta seleccionada: `k6`.
- Tipo de prueba: carga ligera, humo transaccional y validación básica de latencia.

## 4. Herramientas utilizadas

### Herramientas del frontend

- `Vitest`
  - Se usó para ejecutar pruebas unitarias rápidas y compatibles con TypeScript moderno.
  - Se configuró mediante `frontend/vitest.config.ts`.
- `Angular TestBed`
  - Se usó para crear contexto de inyección y probar adaptadores con dependencias reales de Angular.
- `HttpTestingController`
  - Se usó para interceptar solicitudes HTTP y validar que el frontend envía el payload correcto.

### Herramientas del backend

- `JUnit 5`
  - Se usó para validar reglas de negocio, respuestas esperadas y errores de dominio.
- `Spring Web / Spring Test`
  - Apoyan la infraestructura de pruebas del backend.
- `Test doubles`
  - Se implementaron repositorios en memoria y un puerto de IA falso para ejecutar las pruebas sin depender de base de datos ni servicios externos.

### Herramientas de rendimiento

- `k6`
  - Se usó para definir escenarios repetibles de registro, login y consulta de narrativas.
  - Los scripts quedaron en `test/performance`.

## 5. Pruebas implementadas

### 5.1 Pruebas funcionales automatizadas

#### Backend

- Registro de usuario con contraseña obligatoria.
- Registro con rol público válido.
- Inicio de sesión de administrador.
- Inicio de sesión con credenciales inválidas.
- Validación de rol esperado en login.
- Cambio de rol de usuario con trazabilidad.
- Listado docente filtrado por rol y grado.
- Creación de narrativa con autor válido.
- Rechazo de narrativa sin autor.
- Generación de esquema narrativo con IA.
- Aprobación y rechazo editorial.

#### Frontend

- Payload correcto para login.
- Payload correcto para registro.
- Persistencia de sesión en `localStorage`.
- Consulta de perfil remoto.
- Traducción de estados entre frontend y backend.
- Consulta de estudiantes por grado.
- Consulta de narrativas del estudiante.
- Delegación correcta de casos de uso.

### 5.2 Pruebas de calidad

Las pruebas de calidad implementadas verifican:

- validaciones obligatorias
- persistencia de datos mínimos
- trazabilidad de cambios críticos
- traducción de estados entre capas
- consistencia de contratos entre frontend y backend

## 6. Estructura de archivos generados

### Backend

- `backendCulturaStory/src/test/java/com/pollitocorp/backendCulturaStory/application/service/AuthServiceTest.java`
- `backendCulturaStory/src/test/java/com/pollitocorp/backendCulturaStory/application/service/AdminServiceTest.java`
- `backendCulturaStory/src/test/java/com/pollitocorp/backendCulturaStory/application/service/DocenteServiceTest.java`
- `backendCulturaStory/src/test/java/com/pollitocorp/backendCulturaStory/application/service/NarrativaServiceTest.java`
- `backendCulturaStory/src/test/java/com/pollitocorp/backendCulturaStory/application/service/RevisionServiceTest.java`
- `backendCulturaStory/src/test/java/com/pollitocorp/backendCulturaStory/support/TestDoubles.java`

### Frontend

- `frontend/vitest.config.ts`
- `frontend/src/test-setup.ts`
- `frontend/src/app/core/infrastructure/http/auth/http-auth.adapter.spec.ts`
- `frontend/src/app/core/infrastructure/http/narratives/http-narrative.adapter.spec.ts`
- `frontend/src/app/core/infrastructure/http/teacher/http-teacher.adapter.spec.ts`
- `frontend/src/app/core/infrastructure/http/review/http-review.adapter.spec.ts`
- `frontend/src/app/core/application/auth/auth-use-cases.spec.ts`
- `frontend/src/app/core/application/auth/login.use-case.spec.ts`
- `frontend/src/app/core/application/narratives/narrative-use-cases.spec.ts`
- `frontend/src/app/core/application/teacher/teacher-use-cases.spec.ts`
- `frontend/src/app/core/application/review/review.use-cases.spec.ts`

### Carpeta central de soporte

- `test/README.md`
- `test/backend/COBERTURA_BACKEND.md`
- `test/frontend/COBERTURA_FRONTEND.md`
- `test/functional/CASOS_FUNCIONALES.md`
- `test/performance/registro-login.js`
- `test/performance/narrativas.js`

## 7. Ejecución

### Backend

```powershell
cd backendCulturaStory
.\mvnw test
```

### Frontend

```powershell
cd frontend
npm run test:unit
```

### Rendimiento con k6

```powershell
k6 run .\test\performance\registro-login.js
k6 run .\test\performance\narrativas.js
```

También se pueden parametrizar así:

```powershell
$env:BASE_URL='https://narrativas-digitales-culturales.onrender.com/sistema/api/v1'
$env:AUTHOR_ID='UUID_DEL_AUTOR'
k6 run .\test\performance\narrativas.js
```

## 8. Criterios de calidad esperados

- Ninguna prueba crítica debe terminar con error 500.
- Las pruebas de autenticación deben validar tanto flujo correcto como flujo fallido.
- Los estados editoriales deben traducirse sin inconsistencias.
- La latencia del percentil 95 debe mantenerse dentro de los umbrales definidos en `k6`.

## 9. Limitaciones conocidas

- El adaptador de revisión del frontend sigue siendo un mock local; sus pruebas validan su comportamiento actual, no una integración real HTTP.
- Las pruebas de rendimiento se dejan preparadas para ejecución controlada sobre el entorno desplegado o un entorno de staging.
- No se incluyen aún pruebas E2E visuales con navegador completo; pueden añadirse en una segunda fase con Playwright.

## 10. Recomendaciones

1. Ejecutar backend y frontend en integración continua con cada cambio relevante.
2. Añadir pruebas E2E para registro, login, creación de narrativa y revisión docente.
3. Incorporar medición de cobertura para fijar metas mínimas por módulo.
4. Reemplazar el mock de revisión del frontend por integración real y extender sus pruebas.
