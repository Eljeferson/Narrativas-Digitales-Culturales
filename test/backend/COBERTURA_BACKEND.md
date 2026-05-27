# Cobertura de backend

## Servicios cubiertos

- `AuthServiceTest`
  - valida registro con contraseña obligatoria
  - valida normalización de rol público
  - valida sincronización de sesión
  - valida autenticación correcta e incorrecta
- `AdminServiceTest`
  - valida consulta de usuarios
  - valida cambio de rol y registro en bitácora
- `DocenteServiceTest`
  - valida filtro por grado y rol
  - valida consulta de narrativas por autor
- `NarrativaServiceTest`
  - valida creación con autor obligatorio
  - valida valores por defecto
  - valida guardado y consulta
  - valida integración con el puerto de IA
- `RevisionServiceTest`
  - valida publicación
  - valida rechazo
  - valida búsqueda por grado

## Riesgos que cubre

- errores de validación en registro
- pérdida de trazabilidad en cambios de rol
- mezcla de perfiles no estudiantiles en panel docente
- creación de narrativas sin autor válido
- cambios incorrectos de estado editorial
