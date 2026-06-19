# Arquitectura Real del Sistema

**Objetivo:** Descripción completa de la arquitectura general basada en la evidencia recopilada a través de todas las fases anteriores.

## 1. Arquitectura General
El proyecto implementa un **Monolito Modular** en el Backend utilizando **Arquitectura Hexagonal (Ports & Adapters)**, soportado por un **Frontend SPA (Single Page Application)**. A nivel de infraestructura, se despliega utilizando contenedores **Docker**.

## 2. Componentes Principales
- **Capa Cliente (Frontend):** Angular 17+ y Tailwind CSS. Encargada de la interacción de usuario (Estudiantes, Docentes, Administradores, Público).
- **Capa de APIs REST (Backend Adapters In):** Controladores de Spring Web (`@RestController`) que reciben peticiones HTTP y delegan a los casos de uso.
- **Capa de Aplicación (Backend Use Cases):** Servicios que orquestan el dominio (`NarrativaService`, `RevisionService`).
- **Capa de Dominio (Backend Core):** Entidades puras en Java sin dependencias a frameworks (`NarrativaCultural`, `EstadoNarrativa`).
- **Capa de Infraestructura (Backend Adapters Out):** Implementaciones de JPA para persistencia en PostgreSQL (Supabase) y adaptadores HTTP para la API de Gemini de Google.

## 3. Flujo de Datos Típico (Ej: Generación IA)
1. **Frontend:** El usuario (Estudiante) pulsa "Mejorar Texto con IA" en la UI de Angular.
2. **REST Controller:** El request viaja por HTTP POST y es interceptado por `NarrativaController`.
3. **Application Service:** El controlador llama a `NarrativaService.generarMejoraConIA()`.
4. **Outbound Port (Hexagonal):** El servicio llama a la interfaz `GeneradorTextoIAPort`.
5. **Infrastructure Adapter:** La clase `GoogleGeminiAdapter` (que implementa el puerto) formatea el prompt y hace el llamado real a la API de Google utilizando la clave configurada.
6. **Retorno:** La respuesta hace el camino inverso hasta renderizarse en el editor del Frontend.

## 4. Patrones Detectados
- **Dependency Inversion (DIP):** Los servicios de aplicación dependen de puertos (interfaces), no de implementaciones (JPA, Gemini).
- **Circuit Breaker:** Detectado en dependencias (`resilience4j`), presumiblemente protegiendo los llamados externos a Gemini o Supabase ante caídas.
