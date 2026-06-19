# Análisis de Servicios y Configuración

**Objetivo:** Detallar los servicios que componen la infraestructura de ejecución.

## Servicios Internos (Locales / Docker)
1. **culturastory-backend (Puerto 8080):** 
   - El núcleo de negocio. 
   - Consume recursos de Gemini y Supabase.
   - Depende del archivo `.env` en la raíz para configurarse (según el `docker-compose.yml`).

2. **culturastory-frontend (Puerto 80):** 
   - Aplicación cliente en Angular.
   - Sirve la interfaz gráfica para los estudiantes.

3. **culturastory-ia-vocacional (Puerto 8001):** 
   - Un servicio independiente dedicado al modelo vocacional mencionado en el README.

## Servicios Externos Administrados (SaaS)
1. **Supabase (PostgreSQL Database as a Service):**
   - Utilizado para alojar de forma centralizada todas las entidades (Narrativas, Instituciones, Usuarios).
   - El proyecto incluye los archivos DDL (`culturastory_db_completa.sql`) para preparar la instancia de Supabase de manera manual.

2. **Google Gemini (AI Service):**
   - Consumido vía la API de GenAI (integrado a través del paquete de Java `com.google.genai:google-genai`).
   - Genera narrativas dinámicas basadas en los requerimientos del usuario.

## Observaciones de Red
El frontend en Docker Compose depende explícitamente (`depends_on`) del backend, lo que asegura que el orquestador inicie primero las capacidades de API antes de presentar la aplicación al usuario. Las llamadas de base de datos se hacen a través del internet público si se utiliza Supabase, por lo que es mandatorio tener salida a internet en el contenedor del backend.
