# Módulos del Sistema

**Objetivo:** Describir la separación de contextos (Bounded Contexts) implementados en el Modular Monolith.

## 1. Módulo Auth (`auth`)
**Responsabilidad:** Gestión de identidad, registro, inicio de sesión y emisión de tokens o manejo de sesiones (Spring Security).
- **Entidades típicas:** `Usuario`, `Rol`, `Credenciales`.

## 2. Módulo Institución (`institucion`)
**Responsabilidad:** Administración de las entidades educativas a las cuales pertenecen docentes y estudiantes.
- **Entidades típicas:** `Colegio`, `Grado`, `Seccion`.
- **Relación:** Los usuarios de `auth` se relacionan con una `Institución` para delimitar quién puede revisar las historias de quién (Multitenancy lógico simple).

## 3. Módulo Narrativa (`narrativa`)
**Responsabilidad:** Core Domain del sistema. Gestión integral del patrimonio cultural inmaterial documentado por los estudiantes.
- **Flujos:** Creación de historias, generación de assets mediante IA (Gemini), flujos de aprobación y publicación.
- **Relación:** Depende de los identificadores de `auth` (para saber qué estudiante crea o qué docente revisa) pero mantiene sus propios modelos ricos (`AutorEstudiante`, `NarrativaCultural`).
