# Casos de Uso (Application Services)

**Objetivo:** Reconstruir los flujos de orquestación de la capa de Aplicación del módulo core.

Basado en la estructura de `backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/narrativa/application/service/`, encontramos:

## 1. NarrativaService
**Actor Principal:** Estudiante / Autor
- **Casos de Uso:**
  - `crearNarrativa()`: Orquesta la creación inicial en estado `BORRADOR`.
  - `generarMejoraConIA()`: Invoca un puerto externo (Google GenAI) para sugerir mejoras ortográficas o narrativas al `contenidoTexto`.
  - `enviarARevision()`: Cambia el estado del agregado a `EN_REVISION` y notifica (si existe un Observer) al docente asignado.
  - `obtenerNarrativasPublicadas()`: Expone el catálogo para la Biblioteca Cultural.

## 2. RevisionService
**Actor Principal:** Docente
- **Casos de Uso:**
  - `aprobarNarrativa(Long id)`: Cambia el estado a `APROBADO`.
  - `rechazarNarrativa(Long id, String feedback)`: Cambia el estado a `RECHAZADO` adjuntando feedback para iteración.

## 3. DocenteService
**Actor Principal:** Docente / Director
- **Casos de Uso:**
  - `listarNarrativasPendientes(Long docenteId)`: Consulta al repositorio por narrativas en estado `EN_REVISION` filtradas por institución o grado a cargo del docente.
  - `obtenerMetricasAsignacion()`: Provee data para el "Dashboard Analítico Docente" del frontend.
