# Plan de Mejora FURPS+ - CulturaStory AI

## Roadmap de Mejoras

| Fase | Categoría | Mejora | Prioridad |
|---|---|---|---|
| 1 | Reliability | Implementación de Circuit Breaker (Resilience4j) | Crítica |
| 2 | Performance | Optimización de índices y paginación en Supabase | Alta |
| 3 | Usability | Auditoría y remediación de Accesibilidad (WCAG) | Media |
| 4 | Supportability | Incremento de cobertura de pruebas e2e (Playwright) | Baja |

## Mejoras Priorizadas

### 1. Implementación de Circuit Breaker
- **Objetivo:** Prevenir caídas en cascada si la API de Gemini o Speech-to-Text fallan.
- **Justificación:** El sistema ya funciona, pero puede colgarse en producción ante latencia externa.
- **Prioridad:** Crítica.
- **Riesgo:** Bajo (se añade como capa Proxy en Infraestructura).
- **Dependencias:** Spring Cloud / Resilience4j.
- **Estrategia de validación:** Pruebas de estrés simulando caídas de API.
- **Estrategia de rollback:** Deshabilitar la anotación @CircuitBreaker mediante flag de configuración.

### 2. Optimización de índices y paginación
- **Objetivo:** Mejorar tiempos de respuesta al cargar galerías de narrativas.
- **Justificación:** Rendimiento degradado con más de 1000 registros.
- **Prioridad:** Alta.
- **Riesgo:** Bajo (solo afecta Base de Datos y repositorios).
- **Dependencias:** Ninguna (PostgreSQL nativo).
- **Estrategia de validación:** Análisis de EXPLAIN ANALYZE antes y después.
- **Estrategia de rollback:** Revertir los scripts SQL de creación de índices.

### 3. Auditoría de Accesibilidad (A11y)
- **Objetivo:** Cumplir WCAG 2.1 AA.
- **Justificación:** Mejorar inclusión sin afectar la UI actual.
- **Prioridad:** Media.
- **Riesgo:** Bajo.
- **Estrategia de validación:** Lighthouse y Axe DevTools.
- **Estrategia de rollback:** git revert de los commits de UI.

## Riesgos de Ejecución
- Modificar el comportamiento de la red podría generar timeouts imprevistos si la configuración de Resilience4j es muy estricta.

## Estrategia de Preservación de Funcionalidad
- Mantener compatibilidad hacia atrás en los endpoints REST.
- Los cambios estructurales se hacen en la capa `Infrastructure` (adaptadores) respetando estrictamente los `Ports` definidos en `Domain`.
