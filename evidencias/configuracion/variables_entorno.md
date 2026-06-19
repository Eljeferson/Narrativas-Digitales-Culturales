# Variables de Entorno

**Objetivo:** Identificar y documentar todas las variables de entorno necesarias extraídas de `docker-compose.yml` y `application.properties`.

## Tabla de Variables

| Variable | Obligatoria | Descripción | Valor de Ejemplo |
|---|---|---|---|
| `MY_DB_URL` | Sí | URL JDBC de conexión a PostgreSQL (generalmente Supabase) | `jdbc:postgresql://db.xxxx.supabase.co:5432/postgres` |
| `MY_DB_USER` | Sí | Usuario de la base de datos PostgreSQL | `postgres` |
| `MY_DB_PASS` | Sí | Contraseña del usuario de la base de datos | `SuperSecretPassword` |
| `GEMINI_API_KEY` | Sí | Token de acceso a la API de Google GenAI | `AIzaSyB-xxxx-xxxx` |
| `SPRING_PROFILES_ACTIVE` | No | Perfil de ejecución de Spring Boot | `prod` (Definido en `docker-compose.yml`) |

## Análisis Adicional

- **Secretos:** `MY_DB_PASS` es una credencial altamente sensible. No debe ser commiteada en ningún archivo.
- **Tokens:** `GEMINI_API_KEY` es el token de cobro de Google Cloud/Gemini. Su filtración podría incurrir en gastos no deseados.
- **Configuración de base de datos:** Manejado completamente por las 3 primeras variables mencionadas. El puerto estándar por defecto que espera es 5432.
- **Configuración de APIs externas:** Solo existe una externa configurada mediante variables, que es Gemini. Otras APIs (como TTS o Speech-to-Text) parecen ser manejadas por el navegador o no tener claves expuestas en las propiedades del backend.
