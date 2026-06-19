# Matriz de Hallazgos

**Objetivo:** Consolidar todos los hallazgos técnicos desde la auditoría hasta la ingeniería inversa profunda.

| ID | Hallazgo | Evidencia | Impacto | Severidad | Recomendación | Prioridad |
|---|---|---|---|---|---|---|
| H-001 | Versión Experimental de Angular | `package.json` `@angular/core: ^21.2.0` | Inestabilidad del cliente, falta de retrocompatibilidad | Alto | Downgrade a versión estable LTS o documentar uso justificado de la versión. | Alta |
| H-002 | Credenciales no abstraídas en código base | Configuración `.env` en `docker-compose` | Fugas de tokens (Gemini, BD) si el `.env` es expuesto accidentalmente | Crítico | Implementar un gestor de secretos, asegurar el uso estricto del `.gitignore`. | Alta |
| H-003 | Archivo `application.properties` en modo Verbose | Propiedad `spring.jpa.show-sql=true` | Exposición de estructura de BD y datos mediante logs | Medio | Desactivar en perfiles de producción (`application-prod.properties`). | Media |
| H-004 | Arquitectura Hexagonal Verbosidad | Navegación de la capa `modules/narrativa` | Curva de aprendizaje empinada para desarrolladores Junior | Bajo | Proporcionar documentación interna exhaustiva de patrones, como la ya existente en `README.md`. | Baja |
| H-005 | Fuerte dependencia externa a Gemini | Uso core de `GoogleGeminiAdapter` sin un Fallback evidente | Caída del servicio si Google GenAI falla o se excede la cuota | Alto | Implementar Circuit Breaker fallback estático o un proveedor secundario LLM (Ej: Groq/OpenAI). | Media |
