# Plan de Pruebas de CulturaStory

## 1. Propósito

Este documento define el plan de pruebas integral para **CulturaStory**, plataforma web de narrativas digitales culturales con frontend Angular y backend Spring Boot sobre PostgreSQL.

El plan cubre:

- Entorno de pruebas
- Herramientas de prueba
- Pruebas de calidad
- Pruebas funcionales
- Pruebas de rendimiento
- Criterios de entrada, salida y aceptación
- Matriz de pruebas por módulo

Su objetivo es asegurar que la aplicación sea estable, usable, correcta, segura para el contexto educativo y suficientemente rápida para su uso en producción y en pilotos escolares.

---

## 2. Objetivos del plan

1. Verificar que los procesos críticos del sistema funcionen de punta a punta.
2. Detectar defectos funcionales, de integración, de datos, de interfaz y de rendimiento antes de despliegue.
3. Validar que la experiencia del usuario sea consistente para estudiantes, docentes, administradores y comunidad.
4. Confirmar que la plataforma soporte cargas razonables para un piloto académico.
5. Establecer una base repetible para pruebas manuales y automatizadas.

---

## 3. Alcance

## 3.1 En alcance

- Autenticación y registro
- Gestión de perfil del estudiante
- Búsqueda de instituciones
- Creación, edición y consulta de narrativas
- Generación asistida por IA
- Panel docente
- Revisión, aprobación y rechazo de narrativas
- Gestión de usuarios por administrador
- Biblioteca cultural y vistas públicas
- Reproductor de narrativa
- Storyboard y recursos multimedia
- Integración frontend-backend
- Integridad de datos entre UI, API y base de datos

## 3.2 Fuera de alcance inicial

- Exactitud académica de modelos de IA a nivel lingüístico profundo
- Pruebas de compatibilidad con navegadores obsoletos
- Auditorías externas formales de seguridad
- Pruebas de infraestructura cloud avanzadas si no se cuenta con acceso al entorno productivo

---

## 4. Descripción resumida del sistema

## 4.1 Frontend

- Angular SPA
- Rutas principales detectadas:
  - `/`
  - `/registro-de-estudiante`
  - `/panel-del-estudiante`
  - `/panel-del-docente`
  - `/gestion-de-usuarios`
  - `/escritorio-del-autor`
  - `/biblioteca-cultural-explorador`
  - `/vista-detalle-de-narrativa-publica`
  - `/panel-de-aprobacion-docente`
  - `/dashboard-analitico-docente`
  - `/grabacion-voz-stt`
  - `/reproductor-narrativa-tts`
  - `/storyboard-digital-ia`

## 4.2 Backend

Controladores y dominios expuestos:

- `AuthController`
- `AdminController`
- `DocenteController`
- `InstitucionController`
- `NarrativaController`
- `RevisionController`

## 4.3 Base de datos

- PostgreSQL
- Scripts detectados:
  - `culturastory_db_completa.sql`
  - `culturastory_sp_fn_triggers_vistas.sql`

---

## 5. Estrategia general de pruebas

Se recomienda ejecutar las pruebas en las siguientes capas:

1. Pruebas unitarias
2. Pruebas de integración
3. Pruebas funcionales de interfaz
4. Pruebas end-to-end
5. Pruebas de regresión
6. Pruebas de rendimiento
7. Pruebas de calidad no funcional

La estrategia sugerida es:

- Automatizar primero backend y lógica crítica.
- Automatizar después flujos críticos del frontend.
- Mantener una batería mínima de regresión manual para release.
- Ejecutar rendimiento sobre endpoints críticos y flujos de mayor uso.

---

## 6. Entorno de pruebas

## 6.1 Entornos necesarios

### Entorno local de desarrollo

Uso:

- Desarrollo de pruebas
- Debug
- Validación rápida

Configuración:

- Frontend en `localhost:4200`
- Backend en `localhost:8080`
- PostgreSQL local o Docker

### Entorno de integración

Uso:

- Validar integración real entre frontend, backend y base de datos
- Ejecutar pruebas automáticas por rama o antes de merge

Configuración:

- Base de datos separada de desarrollo
- Datos controlados
- Logs habilitados

### Entorno de preproducción o staging

Uso:

- Validación previa a producción
- Ejecución de pruebas funcionales completas
- Validación de rendimiento básico

Configuración:

- Misma versión de backend y frontend que producción
- Variables de entorno similares
- Base de datos con datos semilla realistas

### Entorno de producción

Uso:

- Smoke test post despliegue
- Monitoreo de salud

Configuración:

- Sin pruebas destructivas
- Solo validaciones controladas

## 6.2 Configuración técnica mínima recomendada

### Frontend

- Node.js 18+ o la versión definida por el equipo
- Angular CLI compatible
- Navegadores:
  - Chrome
  - Edge
  - Firefox

### Backend

- Java 21
- Maven
- Spring Boot

### Base de datos

- PostgreSQL 14+ o 15+

### Datos de prueba

Se recomienda preparar:

- 10 estudiantes válidos
- 3 docentes válidos
- 1 administrador
- 20 narrativas en estados variados:
  - borrador
  - pendiente
  - aprobada
  - rechazada
- 10 instituciones educativas
- Regiones culturales y lenguas frecuentes ya precargadas

---

## 7. Herramientas de prueba

## 7.1 Herramientas sugeridas para frontend

- `Vitest`
  - para pruebas unitarias de componentes, adapters y utilidades
- `Angular TestBed`
  - para componentes y formularios
- `Playwright`
  - para pruebas E2E
- `Lighthouse`
  - para calidad web, accesibilidad y rendimiento básico

## 7.2 Herramientas sugeridas para backend

- `JUnit 5`
  - pruebas unitarias
- `Spring Boot Test`
  - pruebas de integración
- `MockMvc`
  - pruebas de controladores REST
- `Testcontainers`
  - pruebas con PostgreSQL real aislado

## 7.3 Herramientas sugeridas para API

- `Postman`
  - colección manual y validación rápida
- `Newman`
  - ejecución automatizada de colección

## 7.4 Herramientas sugeridas para rendimiento

- `k6`
  - carga y estrés sobre endpoints REST
- `JMeter`
  - alternativa si el equipo ya la usa

## 7.5 Herramientas sugeridas para calidad

- `ESLint` o equivalente si se incorpora
- `Prettier`
- `SonarQube` o `SonarCloud`
  - deuda técnica, duplicación y cobertura

## 7.6 Herramientas de seguimiento

- Hoja de control o tablero Kanban
- Matriz de defectos por severidad
- Evidencias en capturas o videos para pruebas E2E

---

## 8. Tipos de prueba que necesita la aplicación

## 8.1 Pruebas unitarias

Objetivo:

- validar funciones, servicios, adapters, mapeos y reglas aisladas

Debe cubrir:

- mapeo de respuestas backend a modelo frontend
- validaciones de formularios
- cálculo de opciones de grado
- reglas de contraseña
- mensajes de error
- filtros de búsqueda
- normalización de roles

## 8.2 Pruebas de integración

Objetivo:

- verificar interacción entre módulos

Debe cubrir:

- frontend con adapters HTTP
- backend con repositorios y servicios
- persistencia en PostgreSQL
- endpoints con DTOs reales
- revisión de constraints y errores de base de datos

## 8.3 Pruebas funcionales

Objetivo:

- verificar que el sistema haga lo que el usuario espera

Debe cubrir:

- flujos completos por rol
- formularios
- navegación
- operaciones CRUD
- estados de revisión

## 8.4 Pruebas end-to-end

Objetivo:

- validar escenarios reales de negocio de punta a punta

Debe cubrir:

- registro
- inicio de sesión
- creación de narrativa
- revisión por docente
- visualización pública

## 8.5 Pruebas de regresión

Objetivo:

- asegurar que nuevas correcciones no rompan módulos existentes

Debe ejecutarse:

- antes de cada release
- después de cambios en autenticación
- después de cambios en narrativa y revisión

## 8.6 Pruebas de usabilidad

Objetivo:

- validar claridad, facilidad de uso y comprensión del flujo

Debe revisar:

- comprensión de mensajes
- facilidad de registro
- facilidad para crear narrativa
- visibilidad de errores
- consistencia del lenguaje en español

## 8.7 Pruebas de compatibilidad

Objetivo:

- confirmar que la interfaz funcione correctamente en diferentes navegadores y tamaños

Debe cubrir:

- escritorio
- tablet
- móvil
- Chrome
- Edge
- Firefox

## 8.8 Pruebas de accesibilidad

Objetivo:

- asegurar una experiencia base accesible

Debe cubrir:

- contraste visual
- foco visible
- navegación por teclado
- labels correctos en formularios
- textos alternativos en imágenes relevantes

## 8.9 Pruebas de seguridad funcional básica

Objetivo:

- reducir riesgos comunes

Debe cubrir:

- acceso por rol
- rutas no autorizadas
- exposición de datos sensibles
- validación de entradas
- manejo de errores
- intentos con payload inválido

## 8.10 Pruebas de rendimiento

Objetivo:

- medir tiempos de respuesta y estabilidad

Debe cubrir:

- login
- registro
- búsqueda de instituciones
- creación de narrativa
- consulta de narrativas por autor
- consulta de biblioteca pública

---

## 9. Atributos de calidad a validar

## 9.1 Calidad funcional

- exactitud de resultados
- integridad de datos
- completitud de procesos

## 9.2 Confiabilidad

- estabilidad de endpoints
- tolerancia a errores de entrada
- consistencia tras fallos parciales

## 9.3 Usabilidad

- formularios comprensibles
- mensajes claros
- navegación intuitiva

## 9.4 Rendimiento

- tiempos de respuesta aceptables
- estabilidad bajo carga media

## 9.5 Mantenibilidad

- cobertura de componentes críticos
- pruebas automáticas repetibles

## 9.6 Compatibilidad

- distintos navegadores
- distintos tamaños de pantalla

---

## 10. Matriz de pruebas por módulo

## 10.1 Autenticación y registro

Casos necesarios:

- registro de estudiante con datos válidos
- registro de docente con datos válidos
- registro con correo duplicado
- registro con contraseña vacía
- registro con contraseña débil
- registro con confirmación distinta
- login con credenciales válidas por rol
- login con contraseña incorrecta
- login con rol distinto al real
- carga de perfil por email
- persistencia en localStorage o sesión frontend

Prioridad:

- Muy alta

## 10.2 Formulario de perfil de estudiante

Casos necesarios:

- validación de nombres y apellidos
- selección de nivel y grado
- búsqueda de institución
- selección de avatar
- selección de lengua materna
- selección de región cultural
- límite de palabras en biografía
- navegación entre pasos sin pérdida de datos
- bloqueo de envío si faltan campos obligatorios

Prioridad:

- Muy alta

## 10.3 Instituciones

Casos necesarios:

- búsqueda por texto
- búsqueda filtrada por nivel
- resultados vacíos
- rendimiento de sugerencias
- comportamiento al perder conexión

Prioridad:

- Alta

## 10.4 Narrativas

Casos necesarios:

- crear narrativa
- actualizar narrativa existente
- recuperar narrativa por id
- listar narrativas por autor
- guardar narrativa incompleta como borrador
- validar contenido obligatorio
- verificar consistencia de estado

Prioridad:

- Muy alta

## 10.5 Generación asistida por IA

Casos necesarios:

- generación de esquema con parámetros válidos
- manejo de timeout o error del proveedor IA
- respuesta vacía o incompleta
- tiempo de respuesta de generación
- consistencia cultural del contenido devuelto

Prioridad:

- Muy alta

## 10.6 Panel del estudiante

Casos necesarios:

- carga del panel
- visualización de narrativas propias
- navegación hacia editor
- visualización de progreso o métricas visibles

Prioridad:

- Alta

## 10.7 Panel docente

Casos necesarios:

- listar estudiantes
- filtrar por grado
- abrir narrativas de un estudiante
- visualizar información académica y cultural

Prioridad:

- Alta

## 10.8 Revisión docente

Casos necesarios:

- listar narrativas pendientes por grado
- aprobar narrativa
- rechazar narrativa con retroalimentación
- persistencia del nuevo estado
- reflejo del cambio en la vista estudiante

Prioridad:

- Muy alta

## 10.9 Administración

Casos necesarios:

- listar usuarios
- visualizar datos de usuario
- validar restricciones por rol
- comprobar que usuarios no autorizados no accedan al panel

Prioridad:

- Media-Alta

## 10.10 Biblioteca cultural y vistas públicas

Casos necesarios:

- listar narrativas públicas
- búsqueda y filtrado
- apertura de detalle público
- consistencia de metadatos
- comportamiento en estado vacío

Prioridad:

- Alta

## 10.11 Reproductor TTS y grabación STT

Casos necesarios:

- apertura de pantalla
- reproducción de contenido
- comportamiento si no hay audio o texto
- manejo de permisos del navegador para micrófono
- estabilidad si el servicio multimedia falla

Prioridad:

- Media-Alta

## 10.12 Storyboard e ilustración

Casos necesarios:

- carga del flujo
- visualización de recursos
- guardado y navegación
- manejo de respuestas vacías de IA

Prioridad:

- Media

---

## 11. Casos críticos end-to-end

Estos son los escenarios mínimos que deben pasar en cada release:

### E2E-01 Registro de estudiante

1. Ingresar a la pantalla principal.
2. Ir a registro de estudiante.
3. Completar los 3 pasos.
4. Enviar formulario.
5. Confirmar creación exitosa en frontend y backend.

### E2E-02 Inicio de sesión y carga de panel

1. Iniciar sesión como estudiante.
2. Validar redirección correcta.
3. Confirmar carga de datos del usuario.

### E2E-03 Crear narrativa

1. Iniciar sesión como estudiante.
2. Ingresar al editor.
3. Crear narrativa.
4. Guardar.
5. Recuperarla desde consulta por autor.

### E2E-04 Revisión docente

1. Iniciar sesión como docente.
2. Ver lista de pendientes.
3. Aprobar o rechazar una narrativa.
4. Verificar cambio de estado.

### E2E-05 Visualización pública

1. Publicar narrativa aprobada.
2. Abrir biblioteca.
3. Confirmar que aparece.
4. Abrir detalle público.

### E2E-06 Administración

1. Iniciar sesión como administrador.
2. Abrir gestión de usuarios.
3. Confirmar visualización correcta del listado.

---

## 12. Pruebas de rendimiento

## 12.1 Objetivos

Validar que la plataforma responda de forma aceptable bajo carga académica moderada.

## 12.2 Escenarios de rendimiento

### Escenario R-01 Login concurrente

- 20 usuarios concurrentes
- endpoint: `/auth/login`
- objetivo:
  - p95 menor a 2 segundos
  - error rate menor a 2%

### Escenario R-02 Registro

- 10 usuarios concurrentes
- endpoint: `/auth/registro`
- objetivo:
  - p95 menor a 3 segundos
  - cero errores por constraint si el payload es válido

### Escenario R-03 Búsqueda de instituciones

- 30 usuarios concurrentes
- endpoint: `/instituciones`
- objetivo:
  - p95 menor a 1 segundo

### Escenario R-04 Consulta de narrativas por autor

- 20 usuarios concurrentes
- endpoint: `/narrativas/autor/{autorId}`
- objetivo:
  - p95 menor a 2 segundos

### Escenario R-05 Biblioteca pública

- 30 usuarios concurrentes
- consultas de listado y detalle
- objetivo:
  - p95 menor a 2 segundos

### Escenario R-06 Generación de esquema con IA

- 5 a 10 solicitudes concurrentes
- endpoint: `/narrativas/generar-esquema`
- objetivo:
  - medir latencia real
  - definir umbral operativo aceptable
  - verificar manejo de timeout

## 12.3 Métricas a registrar

- tiempo promedio
- p90
- p95
- p99
- throughput
- tasa de error
- uso de CPU y memoria del backend
- conexiones activas de base de datos

---

## 13. Pruebas de calidad no funcional

## 13.1 Pruebas de accesibilidad

Checklist mínimo:

- todos los inputs tienen label
- botones con texto o significado claro
- navegación con teclado funcional
- foco visible
- contraste aceptable

## 13.2 Pruebas de compatibilidad responsive

Tamaños mínimos:

- 360x800 móvil
- 768x1024 tablet
- 1366x768 escritorio

## 13.3 Pruebas de consistencia lingüística

Muy importante para esta app:

- textos en español correctos
- tildes correctas
- letra ñ correcta
- mensajes de error comprensibles

## 13.4 Pruebas de resiliencia

- caída del backend
- caída de IA
- pérdida de conexión durante envío
- respuestas 400, 401, 404, 409, 500

---

## 14. Criterios de entrada

Para iniciar pruebas formales debe cumplirse:

- frontend compila sin errores
- backend compila sin errores
- base de datos disponible
- scripts de base ejecutados
- ambiente con datos semilla
- historias críticas desarrolladas
- endpoints accesibles

---

## 15. Criterios de salida

Una versión puede considerarse aceptable si:

- 100% de pruebas críticas ejecutadas
- 100% de pruebas críticas aprobadas
- al menos 95% de pruebas altas aprobadas
- cero defectos bloqueantes abiertos
- cero defectos críticos abiertos
- rendimiento dentro de umbrales acordados en login, registro y consultas principales

---

## 16. Severidad de defectos

### Bloqueante

- impide usar el sistema o un flujo principal completo
- ejemplo: no permite registrar ni iniciar sesión

### Crítica

- daña datos, rompe seguridad o impide una función mayor
- ejemplo: aprobación docente no persiste estado

### Alta

- afecta una función importante con workaround limitado

### Media

- problema parcial con alternativa temporal

### Baja

- problema cosmético o de texto

---

## 17. Cobertura mínima recomendada

## 17.1 Backend

- 80% de cobertura en servicios críticos:
  - autenticación
  - narrativa
  - revisión

## 17.2 Frontend

- 70% de cobertura en:
  - adapters HTTP
  - validaciones del registro
  - componentes de autenticación y registro

## 17.3 E2E

- 100% de flujos críticos definidos en la sección 11

---

## 18. Priorización de ejecución

## Fase 1. Pruebas críticas

- registro
- login
- carga de panel
- creación de narrativa
- revisión docente
- consulta pública

## Fase 2. Pruebas altas

- administración
- filtros
- búsquedas
- multimedia
- métricas y dashboards

## Fase 3. Pruebas complementarias

- accesibilidad
- compatibilidad
- rendimiento extendido

---

## 19. Recomendación de automatización por etapa

## Etapa 1

- pruebas unitarias backend
- pruebas unitarias frontend
- pruebas MockMvc de auth, narrativas y revisión

## Etapa 2

- pruebas E2E con Playwright:
  - registro
  - login
  - narrativa
  - revisión docente

## Etapa 3

- pruebas de API con Postman/Newman
- rendimiento con k6
- calidad con Lighthouse

---

## 20. Plan de ejecución sugerido

### Diario

- unitarias en frontend y backend
- smoke de endpoints críticos

### Por cada funcionalidad nueva

- unitarias
- integración del módulo
- regresión del flujo impactado

### Antes de demo o release

- batería E2E crítica
- regresión funcional alta
- revisión visual
- prueba de rendimiento básico

### Después de despliegue

- smoke test en producción
- validación de login, panel y biblioteca pública

---

## 21. Riesgos que el plan debe controlar

- fallos de mapeo entre frontend y backend
- errores de constraints en base de datos
- cambios de nombres de campos en payloads
- errores por caracteres especiales o codificación
- inconsistencias de rol
- lentitud en consultas o IA
- fallos por datos incompletos
- pérdida de compatibilidad responsive

---

## 22. Lista final de pruebas que necesita la app

La aplicación necesita como mínimo:

1. Pruebas unitarias de frontend.
2. Pruebas unitarias de backend.
3. Pruebas de integración backend con base de datos.
4. Pruebas de controladores REST.
5. Pruebas funcionales de autenticación y registro.
6. Pruebas funcionales de perfil de estudiante.
7. Pruebas funcionales de instituciones.
8. Pruebas funcionales de narrativas.
9. Pruebas funcionales de revisión docente.
10. Pruebas funcionales de administración.
11. Pruebas funcionales de biblioteca pública.
12. Pruebas E2E de flujos críticos.
13. Pruebas de regresión.
14. Pruebas de compatibilidad responsive.
15. Pruebas de accesibilidad.
16. Pruebas de consistencia del idioma español y caracteres especiales.
17. Pruebas de rendimiento para login, registro, consultas y generación asistida por IA.
18. Pruebas de manejo de errores y resiliencia.
19. Pruebas básicas de seguridad funcional por rol y validación de entrada.

---

## 23. Recomendación final para tu proyecto

Para CulturaStory, la prioridad real no es probar todo al mismo nivel desde el día uno. La mejor secuencia es:

1. Automatizar `auth`, `registro`, `narrativas` y `revisión`.
2. Crear una suite E2E corta de 5 o 6 escenarios críticos.
3. Añadir pruebas de rendimiento sobre registro, login, biblioteca e IA.
4. Mantener una revisión manual de idioma, usabilidad y responsive antes de cada entrega.

Con eso tendrás una base sólida tanto académica como práctica para sustentar el plan de pruebas de la aplicación.

