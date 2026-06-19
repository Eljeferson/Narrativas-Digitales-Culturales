# Análisis de Logs - Backend (Análisis Estático y Simulación de Arranque)

**Objetivo:** Matriz de hallazgos de logs, identificando errores y advertencias de configuración en un entorno sin variables inicializadas.

## Matriz de Hallazgos (Backend)

| Hallazgo | Tipo | Descripción | Clasificación |
|---|---|---|---|
| Falla de Arranque (DataSource) | Excepción / Configuración | `IllegalArgumentException: Could not resolve placeholder 'MY_DB_URL' in value "${MY_DB_URL}"`. Spring Boot no puede inicializar HikariCP ni Hibernate sin la cadena de conexión real de Supabase. | Crítico |
| Falla de Arranque (Gemini) | Excepción / Configuración | La ausencia de `GEMINI_API_KEY` causaría un fallo al instanciar el servicio de Google GenAI si es un Bean requerido en el contexto de la aplicación. | Crítico |
| Log Level Restrictivo | Advertencia | `logging.level.root=ERROR` está configurado en `application.properties`. Esto ocultará los logs informativos (INFO) comunes de Spring Boot durante un arranque exitoso, dificultando el debugeo estándar. | Bajo |
| Exposición de SQL | Advertencia / Seguridad | `spring.jpa.show-sql=true` y `logging.level.org.hibernate.SQL=DEBUG` imprimirán todas las sentencias DML y DDL en consola, lo que podría exponer datos sensibles en entornos de producción. | Medio |

**Conclusión:**
La ejecución directa del backend fallará inmediatamente a nivel de inicialización del `ApplicationContext` debido a dependencias duras de variables de entorno no presentes por defecto.
