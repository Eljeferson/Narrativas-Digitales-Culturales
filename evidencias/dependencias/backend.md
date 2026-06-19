# Análisis de Dependencias - Backend

**Objetivo:** Inventariar y categorizar las dependencias del backend basándonos en `pom.xml`.

## 1. Inventario Completo
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-web`
- `jackson-databind`
- `google-genai` (1.0.0)
- `spring-boot-devtools`
- `postgresql`
- `spring-security-crypto`
- `lombok`
- `spring-boot-starter-data-jpa-test`
- `spring-boot-starter-webmvc-test`
- `spring-boot-starter-actuator`
- `spring-cloud-starter-circuitbreaker-resilience4j`
- `spring-boot-starter-aop`

## 2. Dependencias de Producción
- Spring Boot Web
- Spring Boot Data JPA
- PostgreSQL Driver
- Spring Security Crypto
- Jackson Databind
- Google GenAI
- Spring Boot Actuator
- Spring Cloud Circuit Breaker Resilience4j
- Spring Boot AOP

## 3. Dependencias de Desarrollo
- Spring Boot DevTools (scope: runtime)
- Lombok (optional: true)
- Spring Boot Data JPA Test (scope: test)
- Spring Boot WebMVC Test (scope: test)

## 4. Dependencias Críticas
- **google-genai**: Crítica para la generación de historias y funcionalidades principales del sistema.
- **spring-boot-starter-data-jpa**: Crítica para el acceso a datos.

## 5. Dependencias Obsoletas / Potenciales Problemas
- El POM especifica Spring Boot `4.0.5` en el `parent`, versión que no es estándar o es futura (Spring Boot 3.x es la actual estable predominante, o puede tratarse de un error tipográfico en el archivo).

## 6. Vulnerabilidades Potenciales
- Si el proyecto se ejecuta con una versión inestable de Spring Boot, podría carecer de parches de seguridad estándar. 
- La versión `1.0.0` de `google-genai` deberá monitorearse para futuras actualizaciones y depreciaciones de la API de Gemini.

## 7. Dependencias relacionadas con Seguridad
- `spring-security-crypto`: Proveedor de encriptación, típicamente para contraseñas (BCrypt).

## 8. Dependencias relacionadas con Persistencia
- `spring-boot-starter-data-jpa`: Capa ORM / Repositorios.
- `postgresql`: Driver JDBC para PostgreSQL.

## 9. Dependencias relacionadas con APIs
- `spring-boot-starter-web`: Para exponer la API REST del backend.
- `google-genai`: Consumo de la API externa de Google Gemini.
