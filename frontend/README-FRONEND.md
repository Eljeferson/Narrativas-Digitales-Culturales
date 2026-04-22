<div align="center">

# 🎨 Guía de Instalación – Frontend
### CulturaStory AI · Angular 17

[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-9+-CB3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/)

[← Volver al README principal](../README.md) &nbsp;|&nbsp; [← Guía de Backend](../README-BACKEND.md)

</div>

---

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de continuar:

| Herramienta | Versión mínima | Verificar con |
|---|---|---|
| Node.js | 18 o superior | `node -v` |
| npm | 9 o superior | `npm -v` |
| Angular CLI | 17 | `ng version` |
| Git | cualquier versión | `git --version` |

> ⚠️ **Importante:** El backend debe estar corriendo en `http://localhost:8080` antes de iniciar el frontend. Consulta la [Guía de Backend](./README-BACKEND.md) si aún no lo has levantado.

---

## 📥 1. Clonar el Repositorio

Si aún no clonaste el proyecto:

```bash
git clone https://github.com/Eljeferson/Narrativas-Digitales-Culturales.git
cd Narrativas-Digitales-Culturales
```

---

## 📦 2. Instalar Angular CLI (si no lo tienes)

```bash
npm install -g @angular/cli@17
```

Verifica la instalación:

```bash
ng version
```

Deberías ver algo como:

```
     _                      _                 __  __
    / \   _ __   __ _ _   _| | __ _ _ __     / _\/ /
   / △ \ | '_ \ / _` | | | | |/ _` | '__|  / /  / /
  / ___ \| | | | (_| | |_| | | (_| | |     / /_ / /___
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|     \__/ \____/
                |___/

Angular CLI: 17.x.x
Node: 18.x.x
```

---

## 📁 3. Navegar a la Carpeta del Frontend

```bash
cd frontend
```

---

## 📦 4. Instalar Dependencias

```bash
npm install
```

Esto instalará todos los paquetes definidos en `package.json`. El proceso puede tardar algunos minutos la primera vez.

> 💡 Si ves advertencias de `npm warn`, en general puedes ignorarlas. Solo los errores (`npm error`) requieren atención.

---

## ⚙️ 5. Configurar Variables de Entorno

### 5.1 Crear el archivo de entorno local

Ubica los archivos de entorno en `src/environments/`:

```
frontend/src/environments/
├── environment.ts           # Desarrollo (ya existe)
└── environment.prod.ts      # Producción (ya existe)
```

Edita el archivo `src/environments/environment.ts` y asegúrate de que apunte a tu backend local:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  geminiApiKey: '',         // Dejar vacío: el backend gestiona la API key
  appName: 'CulturaStory AI',
  version: '1.1.0'
};
```

> ⚠️ **Nunca** pongas la API key de Gemini directamente en el frontend. El backend es quien se comunica con la API de Gemini.

---

## 🚀 6. Levantar el Frontend en Modo Desarrollo

```bash
ng serve
```

O con apertura automática en el navegador:

```bash
ng serve --open
```

Verás en la consola:

```
✔ Compiled successfully.
Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
  ➜  Network: http://192.168.x.x:4200/
```

Abre tu navegador en **[http://localhost:4200](http://localhost:4200)**.

---

## 🖥️ Pantallas Principales de la Aplicación

Una vez levantado, podrás navegar por las siguientes vistas:

| Ruta | Vista | Rol |
|---|---|---|
| `/` | Landing & Login | Todos |
| `/onboarding` | Registro / Perfil de Autor | Estudiante |
| `/dashboard/estudiante` | The Weaver's Hub | Estudiante |
| `/narrativa/editor` | Author's Desk (Editor con IA) | Estudiante |
| `/dashboard/docente` | Panel de Revisión | Docente |
| `/admin/usuarios` | Gestión de Usuarios | Admin |
| `/repositorio` | Biblioteca Cultural | Comunidad |

---

## 🏗️ 7. Compilar para Producción (opcional)

Si necesitas generar el build de producción:

```bash
ng build --configuration production
```

Los archivos compilados se generarán en la carpeta `dist/`. Estos son los archivos que se despliegan en Vercel u otro hosting.

---

## 🗂️ Estructura del Frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/            # AuthGuard, RoleGuard
│   │   │   ├── interceptors/      # JWT interceptor
│   │   │   └── services/          # AuthService, NarrativaService, IAService
│   │   ├── features/
│   │   │   ├── auth/              # Login, Registro
│   │   │   ├── dashboard/         # Dashboard estudiante y docente
│   │   │   ├── narrativa/         # Editor de narrativas con IA
│   │   │   ├── repositorio/       # Biblioteca cultural
│   │   │   └── admin/             # Panel de administración
│   │   └── shared/
│   │       ├── components/        # Componentes reutilizables
│   │       └── models/            # Interfaces TypeScript
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── styles.scss                # Estilos globales
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🎨 Tecnologías del Frontend

| Tecnología | Uso |
|---|---|
| Angular 17 | Framework principal (SPA) |
| TypeScript 5 | Lenguaje de desarrollo |
| Angular Router | Navegación entre vistas |
| HttpClient | Comunicación con el backend REST |
| Reactive Forms | Formularios de creación narrativa |
| RxJS | Manejo de estados reactivos |
| SCSS | Estilos y diseño visual |

---

## 🛠️ Solución de Problemas Frecuentes

| Error | Causa probable | Solución |
|---|---|---|
| `ng: command not found` | Angular CLI no instalado | Ejecutar `npm install -g @angular/cli@17` |
| `Cannot find module '...'` | Dependencias no instaladas | Ejecutar `npm install` |
| `Error: connect ECONNREFUSED localhost:8080` | Backend no está corriendo | Levantar primero el backend |
| Puerto 4200 en uso | Otro proceso ocupa el puerto | Usar `ng serve --port 4201` |
| Errores de CORS | Backend no permite el origen | Revisar `cors.allowed-origins` en el backend |
| `node_modules` con conflictos | Versiones incompatibles | Ejecutar `rm -rf node_modules && npm install` |

---

## 🔗 Recursos Adicionales

- 📘 [Documentación oficial de Angular 17](https://angular.dev/)
- 🎨 [Demo en producción](https://narrativas-digitales-culturales.vercel.app)
- 🔧 [Guía del Backend](./README-BACKEND.md)
- 🏠 [README Principal](../README.md)

---

## ✅ Verificación Final

Si todo está correcto, deberías poder:

1. ✅ Ver la pantalla de Login en `http://localhost:4200`
2. ✅ Registrarte como estudiante o docente
3. ✅ Crear una narrativa cultural con asistencia de IA
4. ✅ Ver el repositorio cultural con las narrativas publicadas

---

<div align="center">

[← Volver al README principal](../README.md) &nbsp;|&nbsp; [← Guía de Backend](./README-BACKEND.md)

</div>
