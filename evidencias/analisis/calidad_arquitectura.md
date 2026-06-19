# Evaluación Arquitectónica

**Objetivo:** Evaluar los atributos de calidad del sistema con calificación 1 a 5 y proporcionar recomendaciones.

| Atributo | Calificación (1-5) | Justificación Técnica |
|---|:---:|---|
| **Cohesión** | 4.5 | Alta. Las clases y servicios de aplicación tienen responsabilidades muy limitadas y bien delimitadas (Single Responsibility Principle) al estar estructurados en Arquitectura Hexagonal y Monolito Modular. |
| **Acoplamiento** | 4.5 | Muy Bajo (Bueno). El uso estricto de puertos e interfaces aisla el dominio de los frameworks tecnológicos, logrando alta independencia. |
| **Escalabilidad** | 3.5 | Media-Alta. Al ser un monolito modular, es fácilmente convertible a microservicios si se requiere en el futuro. Por ahora escala verticalmente o escalando contenedores del backend, pero el estado de la sesión puede requerir un Redis u otro almacén para ser verdaderamente stateless. |
| **Mantenibilidad** | 4.0 | Alta. La separación estricta en capas (Domain, Application, Infrastructure) facilita la legibilidad, pero incrementa la complejidad inicial y el número de archivos (verbosidad) que los desarrolladores deben navegar. |
| **Testabilidad** | 4.0 | Alta. La lógica de negocio no tiene dependencias de Spring, por lo tanto puede testearse completamente con pruebas unitarias (JUnit/Mockito) sin levantar el contexto de Spring, haciéndolo sumamente rápido. |
| **Seguridad** | 3.5 | Media. Usa Spring Security pero algunas configuraciones observadas (como mostrar SQL debug) y la posible exposición directa de tokens (`GEMINI_API_KEY`) sin Vaults reducen un poco la puntuación en entornos de producción. |

## Recomendaciones de Mejora
1. **Reducción de Verbosidad:** Considerar generadores de código o arquetipos si la arquitectura hexagonal resulta demasiado tediosa para nuevos features simples (operaciones CRUD puras).
2. **Gestión de Secretos:** Integrar HashiCorp Vault, AWS Secrets Manager o equivalentes para reemplazar el archivo `.env` o la exposición en `docker-compose.yml`.
3. **Observabilidad:** Integrar Grafana/Prometheus ya que el proyecto ya expone `spring-boot-starter-actuator` y `resilience4j` métricas.
