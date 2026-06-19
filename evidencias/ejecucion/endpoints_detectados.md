# Descubrimiento Funcional y Endpoints Detectados

**Objetivo:** Inventario funcional del sistema y endpoints basados en los controladores backend y rutas frontend.

## 1. Módulos Funcionales
Según la estructura modular y de enrutamiento:
- **Gestión de Autenticación y Usuarios:** Login, Registro de Estudiantes, Gestión de Usuarios (Admin).
- **Gestión Educativa:** Panel del Docente, Aprobaciones, Dashboard Analítico Docente.
- **Creación de Narrativas:** Escritorio del Autor, Editor Mejorado con IA (Gemini), Grabación de Voz (Speech-to-Text), Storyboard Digital (IA).
- **Publicación y Exhibición:** Biblioteca Cultural, Reproductor de Narrativa (Text-to-Speech), Modo Kiosko, Portal de Comunidad.

## 2. APIs Expuestas (Endpoints Detectados en Backend)
Se identificaron los siguientes controladores REST (`@RestController`):
- `AdminController`: Endpoints orientados a la administración del sistema (usuarios, catálogos exportables).
- `AuthController`: Endpoints para el inicio de sesión, validación de credenciales y generación de sesiones.
- `InstitucionController`: Endpoints de ABM (Alta, Baja, Modificación) para colegios/instituciones.
- `DocenteController`: Endpoints para las vistas de dashboard docente y asignación.
- `NarrativaController`: Core de la aplicación, endpoints para guardar, editar, generar texto con IA, y publicar historias.
- `RevisionController`: Endpoints utilizados por docentes para aprobar/rechazar las narrativas creadas por los estudiantes.
- *Nota:* Todas las APIs se montan bajo el prefix `server.servlet.context-path=/sistema/api/v1`.

## 3. APIs Consumidas (Externas)
- **Google GenAI API (Gemini):** Consumida en el backend para features como "Editor Mejorado IA" y "Storyboard Digital".
- **Speech-to-Text / Text-to-Speech:** Consumidas en el frontend para accesibilidad de la plataforma.

## 4. Flujos Principales
1. **Flujo de Creación:** Estudiante inicia sesión -> Graba voz o usa el editor IA -> Adjunta storyboard generado -> Envía a revisión.
2. **Flujo de Revisión:** Docente accede a su Panel -> Revisa narrativa -> Aprueba -> La narrativa se mueve al estado "Público".
3. **Flujo de Exhibición:** Un visitante accede a la Biblioteca Cultural o al Modo Kiosko -> Visualiza narrativa aprobada e interactúa con el TTS.
