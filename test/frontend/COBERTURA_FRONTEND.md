# Cobertura de frontend

## Adaptadores HTTP cubiertos

- `http-auth.adapter.spec.ts`
  - inicio de sesión
  - registro
  - sincronización de sesión
  - cierre de sesión
  - lectura de sesión local
- `http-narrative.adapter.spec.ts`
  - generación de esquema
  - creación
  - guardado
  - consulta por autor
  - eliminación
- `http-teacher.adapter.spec.ts`
  - listado de estudiantes por grado
  - consulta de narrativas del estudiante
- `http-review.adapter.spec.ts`
  - comportamiento actual del adaptador mock

## Casos de uso cubiertos

- autenticación
- narrativas
- seguimiento docente
- revisión editorial

## Riesgos que cubre

- payload mal formado al backend
- errores de traducción entre estados frontend y backend
- pérdida de sesión en navegador
- consultas docentes sin filtros correctos
