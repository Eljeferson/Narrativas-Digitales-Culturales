# Casos funcionales priorizados

## Autenticación y registro

1. Registrar estudiante con datos válidos y verificar creación de perfil.
2. Registrar docente con datos válidos y verificar rol asignado.
3. Intentar registrar usuario sin contraseña y validar rechazo controlado.
4. Iniciar sesión con estudiante válido.
5. Iniciar sesión con contraseña incorrecta.
6. Iniciar sesión con rol diferente al de la cuenta.

## Narrativas culturales

1. Crear narrativa con autor existente.
2. Intentar crear narrativa sin autor.
3. Guardar cambios de una narrativa existente.
4. Consultar narrativa por identificador.
5. Consultar narrativas por autor.
6. Generar esquema con IA indicando región cultural.

## Seguimiento docente

1. Listar estudiantes por grado.
2. Excluir perfiles no estudiantiles del listado.
3. Consultar narrativas del estudiante.

## Revisión editorial

1. Aprobar narrativa y publicarla.
2. Rechazar narrativa con motivo.
3. Listar narrativas pendientes por grado.

## Administración

1. Listar usuarios del sistema.
2. Cambiar rol de un usuario.
3. Registrar el cambio de rol en bitácora.

## Criterios de aceptación

- Toda operación debe responder con el estado esperado.
- Ninguna prueba crítica debe depender de datos manuales ambiguos.
- Las validaciones obligatorias deben fallar con mensajes claros.
