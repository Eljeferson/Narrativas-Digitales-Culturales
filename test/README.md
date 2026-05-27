# Carpeta de pruebas de CulturaStory

Esta carpeta centraliza la estrategia operativa de pruebas del proyecto y complementa las pruebas automáticas implementadas en:

- `backendCulturaStory/src/test/java`
- `frontend/src/**/*.spec.ts`

## Estructura

- `backend/`: guía de cobertura y alcance de servicios del backend.
- `frontend/`: guía de cobertura y alcance de adaptadores y casos de uso.
- `functional/`: catálogo de escenarios funcionales y de aceptación.
- `performance/`: scripts base para pruebas de rendimiento con `k6`.

## Cobertura implementada

- Backend:
  - autenticación y registro
  - administración de roles
  - consulta docente
  - narrativa cultural
  - revisión editorial
- Frontend:
  - adaptador HTTP de autenticación
  - adaptador HTTP de narrativas
  - adaptador HTTP docente
  - adaptador de revisión
  - casos de uso de autenticación
  - casos de uso de narrativas
  - casos de uso docentes
  - casos de uso de revisión

## Cómo ejecutar

### Backend

Desde `backendCulturaStory`:

```powershell
.\mvnw test
```

### Frontend

Desde `frontend`:

```powershell
npm run test:unit
```

## Herramientas utilizadas

- `JUnit 5` para pruebas unitarias del backend.
- `Spring Boot Test` para soporte de pruebas en el backend.
- `Vitest` para pruebas unitarias del frontend.
- `Angular TestBed` y `HttpTestingController` para probar adaptadores HTTP.
- `k6` para rendimiento y carga.

## Criterio de uso

Esta carpeta no reemplaza el informe general del plan de pruebas; lo vuelve ejecutable. La recomendación es usar el informe como documento académico y esta carpeta como evidencia técnica del trabajo realizado.
