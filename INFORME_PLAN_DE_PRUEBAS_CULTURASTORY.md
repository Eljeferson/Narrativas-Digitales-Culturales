# INFORME DEL PLAN DE PRUEBAS

## CulturaStory

### Plataforma de Narrativas Digitales Culturales

---

## 1. Datos generales

**Proyecto:** CulturaStory  
**Tipo de sistema:** Aplicación web educativa de narrativas digitales culturales  
**Arquitectura:** Frontend Angular + Backend Spring Boot + Base de datos PostgreSQL  
**Propósito del documento:** Definir un plan de pruebas completo, formal y aplicable al sistema  
**Fecha:** 22 de mayo de 2026

---

## 2. Introducción

La calidad de una aplicación web educativa no depende solo de que “funcione”, sino de que lo haga de forma correcta, estable, usable y segura para todos sus usuarios. En el caso de **CulturaStory**, esto es especialmente importante porque la plataforma gestiona procesos clave como el registro de usuarios, la autenticación, la creación de narrativas, la revisión docente, la publicación de contenido y la interacción con servicios de apoyo basados en inteligencia artificial.

Por ello, este informe presenta un **plan de pruebas integral** que permite evaluar el sistema desde varias perspectivas: funcional, técnica, de calidad, de integración y de rendimiento. El documento también especifica el entorno donde se deben ejecutar las pruebas, las herramientas utilizadas o recomendadas, los módulos críticos del sistema y los escenarios que deben validarse antes de una entrega o despliegue.

Este informe está redactado en formato de **documento técnico tipo informe**, para que pueda ser usado como evidencia académica, base metodológica del proyecto y guía práctica para la ejecución de pruebas.

---

## 3. Objetivo del informe

El objetivo principal de este informe es establecer de forma clara y estructurada **qué pruebas necesita CulturaStory**, **cómo deben realizarse**, **con qué herramientas** y **qué criterios deben cumplirse** para considerar que la aplicación posee un nivel aceptable de calidad.

### Objetivos específicos

1. Identificar los módulos críticos de la aplicación que deben ser probados.
2. Definir el entorno técnico necesario para ejecutar las pruebas.
3. Especificar las herramientas de desarrollo, despliegue y prueba vinculadas al proyecto.
4. Determinar los tipos de prueba requeridos: funcionales, de calidad, de integración y de rendimiento.
5. Establecer una matriz de validación por módulo.
6. Proponer una estrategia de automatización gradual.

---

## 4. Descripción del sistema evaluado

**CulturaStory** es una plataforma web educativa orientada a estudiantes, docentes, administradores y comunidad, cuyo propósito es apoyar la creación, revisión y publicación de narrativas culturales digitales.

### Funcionalidades principales identificadas

- Registro de estudiantes y docentes
- Inicio de sesión por rol
- Gestión de perfil de usuario
- Búsqueda de instituciones educativas
- Creación y edición de narrativas
- Revisión y aprobación docente
- Administración de usuarios
- Biblioteca cultural pública
- Visualización de narrativas
- Componentes de apoyo con IA
- Módulos multimedia como STT, TTS y storyboard

---

## 5. Herramientas utilizadas en el proyecto

Esta sección especifica las herramientas tecnológicas del sistema, ya que forman parte del contexto real donde se ejecutará el plan de pruebas.

## 5.1 Herramientas del frontend

### Angular

- **Uso:** Framework principal del frontend.
- **Función en el proyecto:** Construcción de la interfaz web, rutas, formularios, componentes y comunicación con el backend.

### TypeScript

- **Uso:** Lenguaje principal del frontend.
- **Función en el proyecto:** Implementación tipada de componentes, modelos, adaptadores y reglas de interfaz.

### RxJS

- **Uso:** Programación reactiva en frontend.
- **Función en el proyecto:** Manejo de observables y flujos asíncronos de datos.

### Node.js

- **Uso:** Entorno de ejecución del frontend.
- **Función en el proyecto:** Compilación, instalación de dependencias y ejecución local del proyecto Angular.

### npm

- **Uso:** Gestor de paquetes.
- **Función en el proyecto:** Administración de librerías y scripts del frontend.

## 5.2 Herramientas del backend

### Spring Boot

- **Uso:** Framework principal del backend.
- **Función en el proyecto:** Exposición de API REST, lógica de servicios, controladores, configuración y acceso a datos.

### Java 21

- **Uso:** Lenguaje base del backend.
- **Función en el proyecto:** Implementación de servicios, entidades, controladores y lógica del negocio.

### Maven

- **Uso:** Herramienta de construcción del backend.
- **Función en el proyecto:** Compilación, gestión de dependencias y ejecución del proyecto.

### Lombok

- **Uso:** Reducción de código repetitivo.
- **Función en el proyecto:** Generación de builders, getters, setters y constructores.

## 5.3 Herramientas de base de datos

### PostgreSQL

- **Uso:** Base de datos relacional principal.
- **Función en el proyecto:** Persistencia de usuarios, autores, narrativas, revisiones e instituciones.

### Scripts SQL del proyecto

- `culturastory_db_completa.sql`
- `culturastory_sp_fn_triggers_vistas.sql`

**Función en el proyecto:** Crear la estructura de la base de datos, funciones, procedimientos, triggers y vistas necesarias.

## 5.4 Herramientas de despliegue identificadas

### Vercel

- **Uso:** Hosting del frontend.

### Render

- **Uso:** Hosting del backend.

Estas herramientas son importantes para pruebas de integración final y validaciones post despliegue.

---

## 6. Metodología general de pruebas

La estrategia de pruebas para CulturaStory debe ser **mixta**, es decir:

- **manual** para revisión funcional, visual y de usabilidad
- **automatizada** para asegurar repetibilidad, velocidad y cobertura técnica

La metodología recomendada se basa en pruebas por capas:

1. **Pruebas unitarias**
2. **Pruebas de integración**
3. **Pruebas funcionales**
4. **Pruebas end-to-end**
5. **Pruebas de regresión**
6. **Pruebas de calidad no funcional**
7. **Pruebas de rendimiento**

Esto permite detectar errores desde los niveles más pequeños hasta los procesos completos de negocio.

---

## 7. Entorno de pruebas

Para que el plan sea ejecutable, es necesario definir el entorno donde se realizarán las pruebas.

## 7.1 Entorno local

### Propósito

- desarrollo de pruebas
- validación temprana
- depuración rápida

### Configuración

- Frontend Angular ejecutando en `http://localhost:4200`
- Backend Spring Boot ejecutando en `http://localhost:8080`
- PostgreSQL local o vía Docker

## 7.2 Entorno de integración

### Propósito

- validar integración real entre frontend, backend y base de datos
- ejecutar pruebas antes de integración a rama principal

### Configuración recomendada

- base de datos separada del entorno de desarrollo
- datos de prueba controlados
- versión consistente de frontend y backend

## 7.3 Entorno de preproducción

### Propósito

- validar una versión casi final
- ejecutar pruebas funcionales completas
- ejecutar pruebas de rendimiento básico

### Configuración recomendada

- infraestructura similar a producción
- variables de entorno equivalentes
- datos semilla realistas

## 7.4 Entorno de producción

### Propósito

- smoke test después del despliegue
- monitoreo de salud del sistema

### Alcance permitido

- solo validaciones controladas
- no ejecutar pruebas destructivas

---

## 8. Herramientas de prueba recomendadas y justificadas

Esta sección responde directamente a la necesidad de “especificar las herramientas usadas”.

## 8.1 Herramientas para pruebas del frontend

### Vitest

- **Tipo:** Framework de pruebas unitarias
- **Uso recomendado:** Pruebas de componentes, adaptadores, validaciones y funciones de apoyo
- **Justificación:** El frontend ya cuenta con `vitest` entre sus dependencias de desarrollo, por lo que es una base adecuada para automatizar pruebas rápidas y modernas.

### Angular TestBed

- **Tipo:** Herramienta de pruebas de Angular
- **Uso recomendado:** Validar componentes, formularios y comportamiento de UI
- **Justificación:** Permite probar la lógica de los componentes dentro del ecosistema Angular.

### Playwright

- **Tipo:** Herramienta de pruebas end-to-end
- **Uso recomendado:** Automatizar flujos completos como registro, login, creación de narrativa y revisión docente
- **Justificación:** Permite validar escenarios reales como los que ejecuta el usuario final.

## 8.2 Herramientas para pruebas del backend

### JUnit 5

- **Tipo:** Framework de pruebas unitarias para Java
- **Uso recomendado:** Servicios, lógica de negocio y validaciones backend
- **Justificación:** Es el estándar moderno para pruebas en proyectos Java.

### Spring Boot Test

- **Tipo:** Soporte de integración backend
- **Uso recomendado:** Pruebas integradas de servicios y controladores
- **Justificación:** Permite probar el comportamiento del backend dentro del contexto real de Spring.

### MockMvc

- **Tipo:** Herramienta de prueba de controladores REST
- **Uso recomendado:** Validar endpoints HTTP sin necesidad de desplegar toda la aplicación
- **Justificación:** Es ideal para verificar respuestas, códigos HTTP, validación de payloads y errores.

### Testcontainers

- **Tipo:** Pruebas con contenedores reales
- **Uso recomendado:** Integración con PostgreSQL
- **Justificación:** Permite ejecutar pruebas realistas contra una base de datos aislada.

## 8.3 Herramientas para pruebas de API

### Postman

- **Tipo:** Cliente de pruebas de API
- **Uso recomendado:** Validación manual de endpoints críticos
- **Justificación:** Es útil para revisar rápidamente el comportamiento de login, registro, narrativas y revisiones.

### Newman

- **Tipo:** Ejecutor automatizado de colecciones Postman
- **Uso recomendado:** Integrar pruebas API en procesos repetibles
- **Justificación:** Permite automatizar la colección definida en Postman.

## 8.4 Herramientas para pruebas de rendimiento

### k6

- **Tipo:** Herramienta de carga y rendimiento
- **Uso recomendado:** Medir respuesta de login, registro, búsqueda y narrativas
- **Justificación:** Es ligera, moderna y adecuada para APIs REST.

### JMeter

- **Tipo:** Herramienta de carga tradicional
- **Uso recomendado:** Alternativa institucional
- **Justificación:** Si el equipo o la universidad ya la usa, es válida para pruebas de rendimiento y estrés.

## 8.5 Herramientas para calidad del software

### Prettier

- **Uso:** Consistencia de formato del código

### SonarQube o SonarCloud

- **Uso:** Revisión de deuda técnica, duplicación, cobertura y mantenibilidad

### Lighthouse

- **Uso:** Calidad del frontend, accesibilidad y rendimiento visual

---

## 9. Tipos de pruebas que necesita la aplicación

## 9.1 Pruebas funcionales

Son las más importantes para garantizar que la aplicación haga lo que debe hacer.

### Deben cubrir

- registro de usuarios
- autenticación por rol
- validaciones de formularios
- carga de paneles
- creación de narrativas
- actualización de narrativas
- aprobación y rechazo docente
- consulta pública de contenido
- administración de usuarios

## 9.2 Pruebas de integración

Permiten verificar que los módulos se comuniquen correctamente entre sí.

### Deben cubrir

- frontend con backend
- backend con base de datos
- endpoints con persistencia real
- mensajes de error por constraints de BD
- respuesta correcta de APIs al frontend

## 9.3 Pruebas de calidad

Estas pruebas evalúan propiedades del sistema más allá de la función pura.

### Deben cubrir

- consistencia de textos en español
- correcta visualización de tildes y letra ñ
- usabilidad de formularios
- accesibilidad básica
- claridad de mensajes de error
- comportamiento responsive

## 9.4 Pruebas de rendimiento

Permiten medir si el sistema responde bien bajo demanda.

### Deben cubrir

- login
- registro
- búsqueda de instituciones
- consulta de narrativas
- consulta de biblioteca pública
- generación de esquema con IA

---

## 10. Módulos que deben ser probados

## 10.1 Autenticación y registro

### Casos requeridos

- registro exitoso de estudiante
- registro exitoso de docente
- intento de registro con correo duplicado
- intento con contraseña vacía
- intento con contraseña débil
- login válido por rol
- login inválido
- login con rol incorrecto
- sincronización y carga de perfil

## 10.2 Perfil y formulario del estudiante

### Casos requeridos

- validación de nombres y apellidos
- selección de nivel educativo
- selección de grado
- búsqueda y selección de institución
- selección de avatar
- selección de lengua materna
- selección de región cultural
- control de longitud de biografía
- persistencia al pasar entre pasos del formulario

## 10.3 Narrativas

### Casos requeridos

- crear narrativa
- guardar narrativa
- editar narrativa
- recuperar narrativa por id
- listar narrativas por autor
- validar obligatoriedad de campos

## 10.4 Revisión docente

### Casos requeridos

- listar estudiantes
- listar narrativas por estudiante
- listar revisiones pendientes
- aprobar narrativa
- rechazar narrativa
- validar cambio de estado

## 10.5 Administración

### Casos requeridos

- listar usuarios
- visualizar datos
- restringir acceso por rol

## 10.6 Biblioteca cultural pública

### Casos requeridos

- listar narrativas públicas
- ver detalle público
- comprobar metadatos visibles
- comprobar comportamiento en estado vacío

## 10.7 Multimedia e IA

### Casos requeridos

- generar esquema con IA
- manejo de error o timeout de IA
- abrir storyboard
- abrir grabación STT
- abrir reproductor TTS

---

## 11. Pruebas funcionales prioritarias

Se recomienda considerar como **flujos críticos obligatorios** los siguientes:

### Flujo 1. Registro de estudiante

1. Abrir pantalla principal
2. Ir a registro
3. Completar los tres pasos
4. Enviar formulario
5. Confirmar respuesta exitosa y persistencia

### Flujo 2. Inicio de sesión

1. Ingresar credenciales válidas
2. Validar redirección al panel correcto
3. Confirmar disponibilidad de datos del usuario

### Flujo 3. Creación de narrativa

1. Iniciar sesión como estudiante
2. Abrir editor
3. Crear narrativa
4. Guardar
5. Recuperar narrativa desde backend

### Flujo 4. Revisión docente

1. Iniciar sesión como docente
2. Ver narrativas pendientes
3. Aprobar o rechazar una narrativa
4. Confirmar cambio de estado

### Flujo 5. Vista pública

1. Acceder a biblioteca cultural
2. Abrir narrativa publicada
3. Ver detalle sin errores

---

## 12. Pruebas de rendimiento requeridas

Las pruebas de rendimiento deben enfocarse en los procesos de mayor uso y mayor criticidad.

## 12.1 Escenarios sugeridos

### PR-01 Login concurrente

- usuarios simultáneos: 20
- meta:
  - p95 menor a 2 segundos
  - tasa de error menor a 2%

### PR-02 Registro concurrente

- usuarios simultáneos: 10
- meta:
  - p95 menor a 3 segundos
  - cero fallos por payload válido

### PR-03 Búsqueda de instituciones

- usuarios simultáneos: 30
- meta:
  - p95 menor a 1 segundo

### PR-04 Consulta de narrativas por autor

- usuarios simultáneos: 20
- meta:
  - p95 menor a 2 segundos

### PR-05 Biblioteca pública

- usuarios simultáneos: 30
- meta:
  - p95 menor a 2 segundos

### PR-06 Generación de esquema con IA

- solicitudes simultáneas: 5 a 10
- meta:
  - medir latencia real
  - validar tiempo máximo aceptable
  - validar manejo de errores externos

## 12.2 Métricas a registrar

- tiempo promedio de respuesta
- percentil 90
- percentil 95
- percentil 99
- tasa de error
- throughput
- consumo de CPU
- consumo de memoria
- conexiones a base de datos

---

## 13. Pruebas de calidad requeridas

## 13.1 Calidad visual y de idioma

Esta aplicación necesita una validación especial de calidad visual porque presenta texto dirigido a usuarios finales en español.

### Validaciones necesarias

- todos los textos visibles deben estar en español
- no deben aparecer errores de codificación
- no deben romperse tildes
- la letra ñ debe mostrarse correctamente
- los mensajes deben ser claros y comprensibles

## 13.2 Usabilidad

### Validaciones necesarias

- facilidad para registrarse
- facilidad para navegar entre pasos
- facilidad para crear una narrativa
- facilidad para entender estados y errores

## 13.3 Accesibilidad

### Validaciones mínimas

- labels presentes en formularios
- navegación por teclado
- foco visible
- contraste aceptable

## 13.4 Compatibilidad

### Navegadores recomendados para validar

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

### Resoluciones mínimas

- móvil 360x800
- tablet 768x1024
- escritorio 1366x768

---

## 14. Criterios de entrada y salida

## 14.1 Criterios de entrada

Las pruebas deben comenzar cuando:

- el frontend compile sin errores
- el backend compile sin errores
- la base de datos esté disponible
- el entorno de prueba tenga datos válidos
- los endpoints críticos estén operativos

## 14.2 Criterios de salida

Se considera que una versión está apta para entrega cuando:

- todas las pruebas críticas fueron ejecutadas
- todas las pruebas críticas aprobaron
- no existen defectos bloqueantes
- no existen defectos críticos abiertos
- el rendimiento básico cumple los umbrales acordados

---

## 15. Herramientas sugeridas por tipo de prueba

| Tipo de prueba | Herramienta principal | Herramienta complementaria |
|---|---|---|
| Unitaria frontend | Vitest | Angular TestBed |
| Unitaria backend | JUnit 5 | Spring Boot Test |
| Integración backend | Spring Boot Test | Testcontainers |
| Controladores REST | MockMvc | Postman |
| End-to-end | Playwright | Lighthouse |
| API manual | Postman | Newman |
| Rendimiento | k6 | JMeter |
| Calidad de código | SonarQube | Prettier |

---

## 16. Conclusiones

La aplicación **CulturaStory** necesita un plan de pruebas integral porque combina múltiples módulos, distintos roles de usuario, formularios complejos, persistencia de datos, revisión académica y componentes apoyados por inteligencia artificial.

No basta con realizar solo pruebas manuales. Para lograr una validación sólida del sistema, es necesario combinar:

- pruebas funcionales
- pruebas de integración
- pruebas de calidad
- pruebas de rendimiento
- pruebas automatizadas progresivas

Las áreas más críticas del sistema son:

- autenticación y registro
- creación y consulta de narrativas
- revisión docente
- publicación y consulta pública
- manejo correcto de datos en frontend y backend

Además, por tratarse de una plataforma orientada a usuarios finales en contexto educativo, es indispensable probar también la claridad del idioma, la correcta visualización en español y la experiencia general de uso.

En consecuencia, este informe establece una base suficiente para sustentar técnica y metodológicamente el proceso de aseguramiento de calidad de CulturaStory.

---

## 17. Recomendación final

La secuencia más conveniente para implementar el plan de pruebas en tu proyecto es la siguiente:

1. Automatizar primero autenticación, registro, narrativas y revisión docente.
2. Crear una suite end-to-end corta con los flujos críticos.
3. Implementar pruebas de rendimiento sobre login, registro, búsqueda e IA.
4. Mantener una validación manual de idioma, responsive y usabilidad antes de cada entrega.

Esta combinación te dará un plan de pruebas defendible como informe académico y útil como guía práctica de trabajo real.

