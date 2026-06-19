# Reporte de Ingeniería Inversa: CulturaStory AI

## 1. Resumen Ejecutivo
Este reporte documenta el proceso y los resultados de la ingeniería inversa aplicada a la plataforma "CulturaStory AI". Se analizó el código fuente completo del backend (Java/Spring Boot) y frontend (Angular), sus dependencias, configuración de contenedores y la estructura de dominio subyacente. El sistema demuestra un alto grado de madurez arquitectónica al implementar un monolito modular con Arquitectura Hexagonal.

## 2. Objetivos
- Comprender la arquitectura subyacente del sistema.
- Identificar dependencias críticas, puntos de fallo y configuración requerida.
- Reconstruir el modelo de dominio y casos de uso principales.
- Evaluar la calidad del código y proponer mejoras.

## 3. Alcance
El análisis cubrió los repositorios del backend (`backendCulturaStory`), frontend (`frontend`), y orquestación de Docker, incluyendo sus archivos de configuración (`pom.xml`, `package.json`, `.env`, `application.properties`).

## 4. Metodología
El proceso se llevó a cabo en 5 fases secuenciales basadas en prompts especializados:
### 4.1 Auditoría
Inspección superficial de la estructura de directorios y stack tecnológico.
### 4.2 Instalación
Reconstrucción teórica del entorno basándose en manifiestos de dependencias.
### 4.3 Configuración
Extracción de variables de entorno y parámetros de configuración crítica.
### 4.4 Ejecución
Análisis de flujos, enrutamiento (rutas en Angular) y controladores REST expuestos.
### 4.5 Ingeniería Inversa
Profundización en el DDD (Domain Driven Design) analizando la capa `domain` y `application`.

## 5. Inventario Tecnológico
- **Backend:** Java 21, Spring Boot, Spring Data JPA, PostgreSQL.
- **Frontend:** Angular 17/21.x, Tailwind CSS, TypeScript.
- **DevOps:** Docker, Docker Compose.
- **IA y APIs:** API de Google Gemini (`google-genai`), Supabase.

## 6. Arquitectura Detectada
El sistema se clasifica como un **Monolito Modular** construido sobre los principios de la **Arquitectura Hexagonal**. Presenta módulos de negocio separados (`auth`, `institucion`, `narrativa`), cada uno implementando una estricta separación en capas (`domain`, `application`, `infrastructure`).

## 7. Dependencias
Las dependencias críticas que soportan el core del sistema son:
- `@angular/core` y `tailwindcss` para el UI del frontend.
- `spring-boot-starter-web` y `spring-boot-starter-data-jpa` para API y persistencia.
- `google-genai` (1.0.0) para las funciones impulsadas por Inteligencia Artificial generativa.

## 8. Configuración
La aplicación requiere obligatoriamente cuatro variables de entorno para funcionar:
- `MY_DB_URL`: Endpoint de la base de datos PostgreSQL (Supabase).
- `MY_DB_USER`: Usuario DB.
- `MY_DB_PASS`: Contraseña DB.
- `GEMINI_API_KEY`: Token de acceso para los features de IA.

## 9. Ejecución
El flujo de ejecución depende de la correcta inicialización del backend. La API se monta bajo el contexto `/sistema/api/v1` con controladores que manejan Instituciones, Autenticación, Narrativas, y Revisiones. Si las claves de base de datos o IA no se proveen, el servidor Spring Boot falla inmediatamente (Fail-Fast).

## 10. Reconstrucción Arquitectónica
- **Frontend SPA** -> Peticiones HTTP REST -> **Backend API (Adapters In)**
- **Backend API** -> Delega al -> **Application Service** (Ej: `NarrativaService`)
- **Application Service** -> Orquesta lógicas y muta -> **Domain Entities** (`NarrativaCultural`)
- **Application Service** -> Utiliza -> **Infrastructure Adapters Out** (PostgreSQL, Gemini API)

## 11. Modelo de Dominio
El modelo core reside en el módulo `narrativa`. El agregado raíz es `NarrativaCultural`, el cual posee dependencias hacia un `AutorEstudiante` y una `Historia` (Value Object de contenido). El ciclo de vida está controlado estrictamente por el enum `EstadoNarrativa` (Borrador -> En Revisión -> Aprobado/Rechazado -> Publicado).

## 12. APIs e Integraciones
- **Exposición:** El sistema expone rutas como `/narrativa`, `/revision`, `/institucion`.
- **Consumo:** El sistema se integra fuertemente con la infraestructura de Supabase para su capa de datos y con Google Gemini para generación de texto inteligente en los editores escolares.

## 13. Hallazgos
1. **Credenciales en configuración:** Posible riesgo si los archivos `.env` no están bien aislados.
2. **Exposición de SQL:** Activada la propiedad `show-sql`, lo cual es peligroso en producción.
3. **Versión de Angular:** Inconsistencia detectada en `package.json` listando versión `21.2.0`, lo que podría ser un framework inestable o error de tipeo.

## 14. Riesgos
El acoplamiento directo en la infraestructura a un solo proveedor de IA (Gemini) representa un riesgo de escalabilidad u operabilidad en caso de caída del servicio de Google, al no detectar una estrategia clara de Fallback a otro LLM.

## 15. Recomendaciones
- Implementar un gestor de secretos (Vault) para las credenciales.
- Desactivar los logs de depuración SQL en perfiles `prod`.
- Documentar claramente el flujo Hexagonal para agilizar el onboarding de nuevos desarrolladores.
- Validar las versiones utilizadas en `package.json` para garantizar soporte a largo plazo (LTS).

## 16. Conclusiones
**CulturaStory AI** es una plataforma bien estructurada, que aprovecha las mejores prácticas modernas de diseño de software empresarial (DDD, Ports & Adapters) aplicadas al entorno educativo. La separación del dominio de las consideraciones tecnológicas garantiza que el núcleo narrativo permanezca testeable y agnóstico a cambios en bases de datos o proveedores de IA, logrando los objetivos planteados en el desarrollo de ingeniería.
