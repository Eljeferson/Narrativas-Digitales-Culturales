# Auditoría de Implementación FURPS+ - CulturaStory AI

## Comparación Antes / Después
* Auditoría Base: `01_Auditoria_FURPS.md`
* Plan Evaluado: `02_Plan_FURPS.md`

## Estado de las Mejoras

### 1. Implementación de Circuit Breaker (Resilience4j)
- **Estado:** Parcialmente implementada.
- **Evidencia:** Se encontraron referencias a reintentos (Retries) en el adaptador de Gemini, pero la configuración de Fallback (Circuit Breaker) aún permite timeouts de red antes de abrir el circuito.
- **Observación:** El patrón no está maduro en la capa HTTP.

### 2. Optimización de Índices (Supabase)
- **Estado:** Implementada.
- **Evidencia:** El archivo `culturastory_sp_fn_triggers_vistas.sql` presenta creación de índices sobre las columnas de búsqueda frecuentes (ej. título, autor).
- **Observación:** Se percibe mejora real de Performance sin afectar la lógica.

### 3. Accesibilidad (A11y)
- **Estado:** No implementada.
- **Evidencia:** Revisión estática del frontend (Angular) no revela etiquetas ARIA-label añadidas recientemente.

## Búsqueda de Regresiones
- **Regresiones funcionales:** Ninguna detectada.
- **Pruebas fallidas:** Los reportes de Playwright (carpeta `playwright-report`) se mantienen en verde.
- **Nuevos errores:** Se observan logs de advertencia (Warnings) en Spring Boot al intentar reconectar con la API externa, lo que es el comportamiento esperado del Retry.

## Riesgos Residuales
- Sin el Circuit Breaker completo, los picos de latencia en la API externa seguirán consumiendo hilos de Spring Boot (Tomcat), amenazando la estabilidad de la aplicación bajo carga extrema.

## Conclusión de Cumplimiento
El nivel de implementación es **MEDIO**. Las optimizaciones de rendimiento fueron aplicadas exitosamente y sin romper el sistema, pero las medidas de Resiliencia (Circuit Breaker) y Usabilidad (Accesibilidad) requieren una iteración adicional para ser consideradas completas.
