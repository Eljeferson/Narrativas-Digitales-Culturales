# Plan de Remediación OWASP Top 10 - CulturaStory AI

## Roadmap de Remediación (Orden Recomendado)

1. **Restringir CORS y Ocultar Secretos (Security Misconfiguration)**
2. **Corregir Autorización en Borrado (Broken Access Control)**
3. **Prevenir Prompt Injection (Injection)**
4. **Rate Limiting en Auth (Auth Failures)**
5. **Implementar Auditoría de Logs (Logging)**

---

### 1. Configuración Insegura (CORS y Docker)
- **Riesgo:** Alto.
- **Impacto:** Ataques CSRF o acceso cruzado. Filtrado de credenciales.
- **Componentes:** `application.yml`, `docker-compose.yml`, Filtros CORS.
- **Estrategia de Mitigación:** Restringir CORS a `https://narrativas-digitales-culturales.vercel.app`. Migrar secretos a archivos `.env`.
- **Estrategia de Validación:** Peticiones HTTP OPTIONS desde un dominio no autorizado (deben fallar).
- **Estrategia de Rollback:** Revertir configuración en `application.yml`.

### 2. Broken Access Control (Endpoints de Narrativas)
- **Riesgo:** Alto.
- **Impacto:** Borrado de narrativas de otros usuarios.
- **Componentes:** Controladores Spring Boot, Capa de Aplicación.
- **Estrategia de Mitigación:** Añadir validación `userId == currentPrincipal.id` antes de procesar DELETE.
- **Estrategia de Validación:** Test de integración con tokens de diferentes usuarios.
- **Estrategia de Rollback:** Remover la validación.

### 3. Prompt Injection
- **Riesgo:** Medio.
- **Impacto:** Alteración del comportamiento de la IA Gemini.
- **Componentes:** Adaptador de IA (Infrastructure).
- **Estrategia de Mitigación:** Envolver las entradas del usuario con delimitadores fuertes y añadir instrucciones al system prompt.
- **Estrategia de Validación:** Intentos de jailbreak en el entorno de staging.
- **Estrategia de Rollback:** Retornar al prompt anterior.

## Riesgos de Implementación
- Restringir CORS podría bloquear el acceso temporalmente desde entornos locales de desarrollo si no se añaden a `allowedOrigins`.

## Estrategia para Preservar Funcionalidad
- Mantener compatibilidad hacia atrás: los cambios son estructurales en infraestructura y validaciones internas, las firmas de los endpoints REST (contratos) no cambiarán.
