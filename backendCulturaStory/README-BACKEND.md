<div align="center">

# 🔧 Guía de Instalación – Backend
### CulturaStory AI · Spring Boot + PostgreSQL

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=java)](https://www.java.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Maven](https://img.shields.io/badge/Maven-3.8+-C71A36?style=for-the-badge&logo=apachemaven)](https://maven.apache.org/)

[← Volver al README principal](../README.md)

</div>

---

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de continuar:

| Herramienta | Versión mínima | Verificar con |
|---|---|---|
| Java JDK | 17 o superior | `java -version` |
| Maven | 3.8 o superior | `mvn -version` |
| PostgreSQL | 14 o superior | `psql --version` |
| Git | cualquier versión | `git --version` |

> 💡 También puedes usar **Docker** para levantar PostgreSQL sin instalarlo directamente. Ver [sección con Docker](#-levantar-postgresql-con-docker-opcional).

---

## 📥 1. Clonar el Repositorio

```bash
git clone https://github.com/Eljeferson/Narrativas-Digitales-Culturales.git
cd Narrativas-Digitales-Culturales
```

---

## 🗄️ 2. Configurar la Base de Datos

### 2.1 Crear la base de datos en PostgreSQL

Abre tu cliente de PostgreSQL (psql, pgAdmin, DBeaver, etc.) y ejecuta:

```sql
CREATE DATABASE culturastory_db;
CREATE USER culturastory_user WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE culturastory_db TO culturastory_user;
```

### 2.2 Ejecutar los scripts SQL

Desde la raíz del repositorio, ejecuta los scripts en este orden:

```bash
# 1. Crear todas las tablas y estructura principal
psql -U culturastory_user -d culturastory_db -f culturastory_db_completa.sql

# 2. Crear procedimientos almacenados, funciones, triggers y vistas
psql -U culturastory_user -d culturastory_db -f culturastory_sp_fn_triggers_vistas.sql
```

O si usas pgAdmin / DBeaver, abre cada archivo `.sql` y ejecútalo en orden sobre la base de datos `culturastory_db`.

### 2.3 Levantar PostgreSQL con Docker (opcional)

Si prefieres no instalar PostgreSQL directamente:

```bash
docker run --name culturastory-db \
  -e POSTGRES_DB=culturastory_db \
  -e POSTGRES_USER=culturastory_user \
  -e POSTGRES_PASSWORD=tu_password_seguro \
  -p 5432:5432 \
  -d postgres:15
```

Luego ejecuta los scripts SQL normalmente.

---

## ⚙️ 3. Configurar el Backend

Navega a la carpeta del backend:

```bash
cd backendCulturaStory
```

### 3.1 Configurar `application.properties`

Abre el archivo `src/main/resources/application.properties` (o `application.yml`) y configura las siguientes variables:

```properties
# ─── Base de Datos ───────────────────────────────────────────
spring.datasource.url=jdbc:postgresql://localhost:5432/culturastory_db
spring.datasource.username=culturastory_user
spring.datasource.password=tu_password_seguro
spring.datasource.driver-class-name=org.postgresql.Driver

# ─── JPA / Hibernate ─────────────────────────────────────────
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# ─── Servidor ────────────────────────────────────────────────
server.port=8080

# ─── Google Gemini API ───────────────────────────────────────
gemini.api.key=TU_API_KEY_DE_GOOGLE_AI_STUDIO
gemini.api.model=gemini-1.5-flash

# ─── CORS (permitir frontend local) ──────────────────────────
cors.allowed-origins=http://localhost:4200
```

> ⚠️ **Importante:** Nunca subas tu API key de Gemini al repositorio. Usa variables de entorno en producción.

### 3.2 Obtener la API Key de Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Get API Key"**
4. Crea un proyecto nuevo o selecciona uno existente
5. Copia la API key generada y pégala en `application.properties`

---

## 🚀 4. Levantar el Backend

### Opción A – Con Maven Wrapper (recomendado)

```bash
# Desde la carpeta backendCulturaStory/
./mvnw spring-boot:run
```

En Windows:
```cmd
mvnw.cmd spring-boot:run
```

### Opción B – Con Maven instalado

```bash
mvn spring-boot:run
```

### Opción C – Compilar y ejecutar el JAR

```bash
# Compilar
mvn clean package -DskipTests

# Ejecutar el JAR generado
java -jar target/culturastory-*.jar
```

---

## ✅ 5. Verificar que el Backend está Activo

Una vez levantado, deberías ver en la consola algo similar a:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.x.x)

Started CulturaStoryApplication in X.XXX seconds
```

Prueba los siguientes endpoints desde tu navegador o Postman:

```
# Health check
GET http://localhost:8080/actuator/health

# Generar una narrativa cultural (POST)
POST http://localhost:8080/api/narrativas/generar
Content-Type: application/json

{
  "cultura_region": "andina",
  "nivel_grado": "4to secundaria",
  "autor_id": "test-001"
}
```

---

## 🐋 6. Levantar Todo con Docker Compose (alternativa completa)

Si tienes Docker instalado, puedes levantar el backend y la base de datos juntos desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto levantará:
- PostgreSQL en el puerto `5432`
- Backend Spring Boot en el puerto `8080`

---

## 🗂️ Estructura del Backend

```
backendCulturaStory/
├── src/main/java/
│   └── com/culturastory/
│       ├── domain/
│       │   ├── entities/          # NarrativaCultural, Estudiante, etc.
│       │   ├── ports/             # IAServicePort, NarrativaRepositoryPort
│       │   └── factories/         # NarrativaFactory
│       ├── application/
│       │   └── usecases/          # GenerarNarrativaUseCase, etc.
│       └── infrastructure/
│           ├── adapters/
│           │   ├── in/            # Controllers REST
│           │   └── out/           # IAServiceProxy, NarrativaRepoAdapter
│           └── config/            # Beans, CORS, seguridad
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

---

## 🛠️ Solución de Problemas Frecuentes

| Error | Causa probable | Solución |
|---|---|---|
| `Connection refused` en puerto 5432 | PostgreSQL no está corriendo | Iniciar el servicio de PostgreSQL |
| `Invalid API key` | API key de Gemini incorrecta | Verificar la key en Google AI Studio |
| `Table does not exist` | Scripts SQL no ejecutados | Correr los `.sql` en orden |
| `Port 8080 already in use` | Puerto ocupado | Cambiar `server.port` en properties o liberar el puerto |
| Error de CORS | URL del frontend no configurada | Verificar `cors.allowed-origins` en properties |

---

## 🔗 Siguiente Paso

Con el backend corriendo en `http://localhost:8080`, ya puedes levantar el frontend:

👉 [Guía de instalación del Frontend](../frontend/README-FRONTEND.md)

---

<div align="center">

[← Volver al README principal](../README.md)

</div>
