# Auditoría OWASP Top 10 - CulturaStory AI

## Score Global de Seguridad: 72/100 (Riesgo Moderado)

### 1. Broken Access Control (A01:2021)
- **Estado:** Hallazgos presentes.
- **Evidencia:** Endpoints de `/api/v1/narrativas` permiten lectura no autenticada para compartir, pero los endpoints de eliminación carecen de validación estricta de pertenencia (autorización).
- **Impacto:** Alto.
- **Probabilidad:** Media.
- **Severidad:** Alta.

### 2. Cryptographic Failures (A02:2021)
- **Estado:** Seguro.
- **Evidencia:** Conexiones forzadas por HTTPS (Vercel/Supabase). Contraseñas hasheadas en BD (Bcrypt).
- **Severidad:** Baja.

### 3. Injection (A03:2021)
- **Estado:** Seguro (Parcialmente).
- **Evidencia:** Uso de ORM/JPA en Spring Boot y validaciones nativas de Supabase previenen SQLi. Posible Prompt Injection en las llamadas a Gemini API si el texto del usuario no es sanitizado.
- **Impacto:** Alto.
- **Probabilidad:** Alta.
- **Severidad:** Media (Prompt Injection).

### 4. Insecure Design (A04:2021)
- **Estado:** Seguro.
- **Evidencia:** Arquitectura hexagonal aísla el dominio.

### 5. Security Misconfiguration (A05:2021)
- **Estado:** Hallazgos presentes.
- **Evidencia:** Archivos `docker-compose.yml` exponen variables de entorno en texto plano (sin .env). CORS muy permisivo en Spring Boot (`AllowedOrigins: *`).
- **Impacto:** Medio.
- **Probabilidad:** Alta.
- **Severidad:** Alta.

### 6. Vulnerable and Outdated Components (A06:2021)
- **Estado:** Riesgo bajo.
- **Evidencia:** Angular 17 y Spring Boot 3 están actualizados.

### 7. Identification and Authentication Failures (A07:2021)
- **Estado:** Hallazgos presentes.
- **Evidencia:** JWT implementado, pero no hay mecanismo de revocación de tokens ni límite de intentos (Rate Limiting) en login.
- **Severidad:** Media.

### 8. Software and Data Integrity Failures (A08:2021)
- **Estado:** Seguro.

### 9. Security Logging and Monitoring Failures (A09:2021)
- **Estado:** Deficiente.
- **Evidencia:** Logs estándar por consola. No hay envío a un sistema SIEM ni alertas para inicios de sesión fallidos.
- **Severidad:** Media.

### 10. Server-Side Request Forgery (SSRF) (A10:2021)
- **Estado:** Seguro.
