# Detección Arquitectónica

**Objetivo:** Determinar la arquitectura predominante basándose en la estructura de carpetas, módulos y dependencias.

## Arquitecturas Encontradas

### 1. Modular Monolith (Monolito Modular)
- **Evidencias**: La estructura del código agrupa las funcionalidades por contextos de negocio (auth, institucion, narrativa) dentro de una única aplicación y despliegue (Spring Boot).
- **Carpetas involucradas**: `backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/`
- **Nivel de confianza**: Alta
- **Justificación técnica**: A diferencia de los microservicios, todos los dominios están empaquetados en el mismo proyecto y base de código, pero están separados lógicamente por carpetas de módulos para promover un bajo acoplamiento.

### 2. Arquitectura Hexagonal (Ports & Adapters) / Clean Architecture
- **Evidencias**: Cada submódulo dentro de `modules/` se subdivide en tres capas principales: `domain`, `application` e `infrastructure`. Esto refleja la separación de responsabilidades propuesta por la Arquitectura Hexagonal y Clean Architecture.
- **Carpetas involucradas**: 
  - `modules/[nombre_modulo]/domain/` (Entidades centrales y puertos/interfaces)
  - `modules/[nombre_modulo]/application/` (Casos de uso)
  - `modules/[nombre_modulo]/infrastructure/` (Adaptadores de base de datos, APIs externas o controladores REST)
- **Nivel de confianza**: Alta
- **Justificación técnica**: La presencia consistente de las capas de dominio (reglas de negocio centrales), aplicación (orquestación) e infraestructura (tecnología) a nivel de cada módulo confirma la adopción explícita de un diseño centrado en el dominio donde las dependencias apuntan hacia adentro.

### 3. MVC (Model-View-Controller) / SPA (Single Page Application)
- **Evidencias**: En el frontend, se observa una arquitectura SPA basada en componentes estructurados por características y servicios (`core`, `components`).
- **Carpetas involucradas**: `frontend/src/app/`
- **Nivel de confianza**: Alta
- **Justificación técnica**: Angular sigue patrones de componentes y servicios que separan la vista (`.html`, `.css`) de la lógica del controlador/modelo (`.ts`), típico de los frameworks frontend modernos.

## Conclusión Final

La arquitectura predominante en el backend es un **Monolito Modular basado en Arquitectura Hexagonal (Ports & Adapters)**. Esta decisión arquitectónica permite aislar completamente el núcleo de negocio de la tecnología (bases de datos, controladores REST, servicios de IA Gemini), facilitando el testing y garantizando que las reglas de negocio no se contaminen con detalles de infraestructura. El Frontend opera independientemente como una **SPA (Single Page Application)** conectada mediante interfaces REST.
