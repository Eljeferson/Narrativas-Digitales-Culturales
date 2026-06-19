# Reconstrucción del Entorno - Instalación

**Objetivo:** Reconstruir el entorno necesario para ejecutar el proyecto en un entorno local (Ubuntu).

## 1. Software Requerido y 2. Versiones Recomendadas
- **Java JDK**: 21 (Recomendado: OpenJDK 21)
- **Maven**: 3.8+ (o usar `./mvnw` incluido)
- **Node.js**: v24.15.0+
- **NPM**: 10.8.2+
- **Docker**: 24.0+
- **Docker Compose**: 2.20+
- **Angular CLI**: 21.2.6

## 3. Servicios Externos Requeridos
- **Google Gemini API**: Clave de API activa para generación de textos e imágenes.

## 4. Bases de Datos Requeridas
- **PostgreSQL**: Se recomienda versión 15+. Se puede usar una base de datos local o remota (como Supabase, que es lo documentado).

## 5. Procedimiento Completo de Instalación (Linux Ubuntu)

```bash
# 1. Actualizar repositorios e instalar prerrequisitos
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git apt-transport-https ca-certificates software-properties-common

# 2. Instalar OpenJDK 21
sudo apt install -y openjdk-21-jdk

# 3. Instalar Node.js (v24) y NPM
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Instalar Docker y Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# (Requerirá reiniciar sesión para que aplique el grupo docker)

# 5. Clonar el proyecto
git clone <URL_DEL_REPOSITORIO> Narrativas-Digitales-Culturales
cd Narrativas-Digitales-Culturales

# 6. Configurar variables de entorno
# Crear archivo .env en la raíz o exportar variables
export MY_DB_URL="jdbc:postgresql://<TU_SUPABASE_HOST>:5432/postgres"
export MY_DB_USER="<TU_USUARIO>"
export MY_DB_PASS="<TU_PASSWORD>"
export GEMINI_API_KEY="<TU_API_KEY>"

# 7. Ejecutar mediante Docker Compose (Opción Recomendada)
docker-compose up --build -d

# --- Alternativa Manual ---

# Levantar Backend Manualmente
cd backendCulturaStory
./mvnw spring-boot:run

# Levantar Frontend Manualmente (En otra terminal)
cd frontend
npm install
npm run start
```

## 6. Configuración Necesaria
Asegurarse de tener los puertos **8080** (backend) y **80** (frontend) disponibles en la máquina host si se usa Docker Compose.
El script de base de datos (`culturastory_db_completa.sql`) debe ejecutarse en el servidor PostgreSQL antes de iniciar la aplicación por primera vez, ya que la propiedad `spring.jpa.hibernate.ddl-auto=none` indica que Hibernate NO generará las tablas automáticamente.
