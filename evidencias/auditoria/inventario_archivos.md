# Inventario de Archivos - CulturaStory AI

A continuación se presenta un inventario de alto nivel de los directorios y archivos principales del proyecto, obtenido durante la fase de auditoría.

## Raíz del Proyecto
- `backendCulturaStory/`: Contiene el backend desarrollado en Spring Boot.
- `frontend/`: Contiene el frontend desarrollado en Angular.
- `IA/`: Directorio con scripts y pruebas de concepto relacionadas a la Inteligencia Artificial (Python).
- `docs/`: Carpeta destinada a la documentación del proyecto.
- `docker-compose.yml`: Archivo de orquestación de contenedores para levantar los servicios.
- `README.md`: Documentación principal con la descripción general, arquitectura y guías.
- `culturastory_db_completa.sql` y `culturastory_sp_fn_triggers_vistas.sql`: Scripts de base de datos PostgreSQL.

## Estructura del Backend (`backendCulturaStory/`)
- `pom.xml`: Archivo de configuración de Maven con las dependencias del proyecto.
- `Dockerfile`: Archivo para la creación de la imagen Docker del backend.
- `src/main/java/com/pollitocorp/backendCulturaStory/`:
  - `infrastructure/`: Configuración, adaptadores de seguridad, excepciones globales.
  - `modules/`: Módulos de negocio (Modular Monolith) separados por contexto.
    - `auth/`: Módulo de autenticación y seguridad.
    - `institucion/`: Módulo de gestión de instituciones educativas.
    - `narrativa/`: Módulo central de narrativas culturales.

## Estructura del Frontend (`frontend/`)
- `package.json`: Archivo de dependencias de npm y scripts de ejecución.
- `angular.json`: Configuración del workspace de Angular.
- `Dockerfile`: Archivo para la imagen Docker del frontend.
- `tailwind.config.js` / `postcss.config.json`: Configuración de Tailwind CSS.
- `src/app/`:
  - `core/`: Servicios globales, interceptores y guards.
  - `components/`: Componentes reutilizables o features específicos.
  - Archivos de enrutamiento (`app.routes.ts`) y configuración base (`app.config.ts`).
