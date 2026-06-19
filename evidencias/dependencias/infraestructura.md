# Análisis de Dependencias - Infraestructura

**Objetivo:** Inventariar y categorizar las dependencias de infraestructura basándonos en `docker-compose.yml` y configuración en entorno local.

## 1. Inventario Completo
Servicios definidos en `docker-compose.yml`:
- **backend**: Basado en el `Dockerfile` de `backendCulturaStory`. Expone puerto 8080.
- **frontend**: Basado en el `Dockerfile` de `frontend`. Expone puerto 80.
- **ia-vocacional**: Basado en el `Dockerfile` de `IA`. Expone puerto 8001.

Dependencias externas adicionales (mencionadas en README):
- **Supabase (PostgreSQL)**

## 2. Dependencias de Producción
- Contenedores Docker de Backend, Frontend, e IA Vocacional.
- Servidor PostgreSQL hosteado en Supabase.
- API remota de Google Gemini.

## 3. Dependencias de Desarrollo
- `docker-compose.yml` como herramienta de orquestación local unificada.

## 4. Dependencias Críticas
- **Supabase**: Toda la base de datos relacional vive aquí.
- **ia-vocacional**: Microservicio en Python/FastAPI u otro framework necesario para las métricas vocacionales o testing.

## 5. Dependencias relacionadas con APIs y Networking
- `backend` -> Redirige tráfico hacia internet (Gemini API y Supabase).
- `frontend` -> Depende explícitamente (`depends_on`) del servicio `backend`.
- Todos los servicios usan puertos predeterminados u 8001 para la interconexión.
