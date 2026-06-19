# Descubrimiento Tecnológico

**Objetivo:** Identificar todas las tecnologías utilizadas sin asumir previamente ningún lenguaje o framework.

## Tecnologías Encontradas

| Categoría | Tecnología | Evidencia | Confianza |
|---|---|---|---|
| Lenguajes | Java (21) | `pom.xml` (`<java.version>21</java.version>`) | Alta |
| Lenguajes | TypeScript | `frontend/package.json` (`typescript`) | Alta |
| Lenguajes | SQL | Archivos `.sql` en la raíz | Alta |
| Frameworks Backend | Spring Boot (4.0.5) | `pom.xml` (`spring-boot-starter-parent`) | Alta |
| Frameworks Frontend | Angular (21.2) | `frontend/package.json` (`@angular/core`) | Alta |
| Tecnologías Frontend | Tailwind CSS | `frontend/package.json` (`tailwindcss`) | Alta |
| Bases de datos | PostgreSQL | `pom.xml` (`org.postgresql:postgresql`), `README.md` | Alta |
| Bases de datos | Supabase | `README.md` (mencionado como proveedor DB) | Media |
| Herramientas DevOps | Docker & Docker Compose | `Dockerfile`, `docker-compose.yml` | Alta |
| Servicios externos | Gemini (Google GenAI) | `pom.xml` (`google-genai`), `README.md` | Alta |
| Servicios externos | Speech-to-Text / TTS API | `README.md` (diagrama de arquitectura) | Media |
| Sistemas de autenticación | Spring Security | `pom.xml` (`spring-security-crypto`) | Alta |

## Conclusión Técnica

Tras auditar el código fuente, dependencias y archivos de configuración del proyecto **CulturaStory AI**, podemos determinar de manera concluyente que se trata de una aplicación web fullstack estructurada en contenedores. 

El **Backend** está fuertemente acoplado al ecosistema **Java/Spring Boot**, haciendo uso de tecnologías como Spring Data JPA y Spring Cloud Circuit Breaker, además de conectarse a **PostgreSQL** y utilizar la API de **Google GenAI (Gemini)** para funcionalidades de inteligencia artificial.

El **Frontend** es una Single Page Application (SPA) desarrollada en **Angular** (en su versión más reciente, utilizando Tailwind CSS para los estilos. 

El despliegue y orquestación locales están definidos explícitamente mediante **Docker Compose**, definiendo al menos tres servicios principales: `backend`, `frontend`, e `ia-vocacional`.
