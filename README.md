<div align="center">

# 🌄 CulturaStory AI
### Plataforma de Narrativas Digitales Culturales

**Basada en Inteligencia Artificial y Arquitectura Hexagonal para Educación Escolar**

[![Angular](https://img.shields.io/badge/Frontend-Angular%2017-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Gemini](https://img.shields.io/badge/IA-Gemini%201.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

</div>

---

## 📖 ¿Qué es CulturaStory AI?

**CulturaStory AI** es una plataforma web educativa que permite a estudiantes de educación escolar **crear, digitalizar y publicar narrativas culturales** con el apoyo de Inteligencia Artificial generativa. El proyecto nace de la necesidad de preservar el patrimonio cultural inmaterial de las comunidades andinas, amazónicas, afroperuanas y costeñas del Perú, integrando tecnología accesible e intercultural en el aula.

La plataforma fue desarrollada como proyecto de ingeniería en la **Universidad Continental – Junín, Perú**, dentro de la asignatura Taller de Proyectos de Ingeniería de Sistemas e Informática.

---

## 🎯 Objetivo

Desarrollar una plataforma web de narrativas digitales culturales basada en IA generativa, implementada sobre **arquitectura hexagonal**, que permita a estudiantes de educación escolar:

- ✍️ Crear historias culturalmente pertinentes de sus comunidades
- 🎙️ Digitalizar relatos orales mediante Speech-to-Text
- 🖼️ Ilustrar sus narrativas con imágenes generadas por IA
- 📚 Publicar y preservar el patrimonio cultural local
- 🔌 Funcionar en entornos con conectividad limitada (modo offline-first)

---

## 🧩 Arquitectura del Sistema

El sistema está implementado bajo **Arquitectura Hexagonal (Ports & Adapters)**, con los patrones de diseño **Strategy**, **Proxy**, **Observer** y **Factory**, lo que permite:

- Desacoplar el núcleo de negocio de la infraestructura (IA, base de datos, multimedia)
- Sustituir proveedores de IA sin modificar la lógica central
- Garantizar operatividad offline mediante `PlantillaOfflineStrategy` vía el patrón Proxy

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│                      Angular 17 SPA                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────▼──────────────────────────────────┐
│                        BACKEND                              │
│               Spring Boot – Arquitectura Hexagonal          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │   Domain    │  │  Application │  │   Infrastructure  │  │
│  │  Entities   │◄─│  Use Cases   │◄─│  Adapters (IA,    │  │
│  │   Ports     │  │              │  │  DB, Multimedia)  │  │
│  └─────────────┘  └──────────────┘  └───────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   PostgreSQL         Gemini 1.5         Speech-to-Text
   (Supabase)         Flash API          / TTS API
```

---

## 🗂️ Estructura del Repositorio

```
Narrativas-Digitales-Culturales/
│
├── 📁 backendCulturaStory/      # Backend Spring Boot (Arquitectura Hexagonal)
│   ├── src/
│   │   ├── domain/              # Entidades, puertos e interfaces
│   │   ├── application/         # Casos de uso
│   │   └── infrastructure/      # Adaptadores (IA, BD, multimedia)
│   ├── pom.xml
│   └── ...
│
├── 📁 frontend/                 # Frontend Angular 17
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/            # Guards, interceptors, servicios
│   │   │   ├── features/        # Módulos por funcionalidad
│   │   │   └── shared/          # Componentes reutilizables
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── 📁 IA/                       # Scripts y pruebas de concepto en Python
│
├── culturastory_db_completa.sql              # Script DDL completo de la base de datos
├── culturastory_sp_fn_triggers_vistas.sql   # Procedimientos, funciones y vistas
└── README.md                    # Este archivo
```

---

## 🚀 Guías de Instalación

Selecciona la guía según el componente que deseas levantar:

<table>
  <tr>
    <td align="center">
      <a href="./backendCulturaStory/README-BACKEND.md">
        <img src="https://img.shields.io/badge/🔧_Guía_Backend-Spring_Boot-6DB33F?style=for-the-badge" />
        <br/>
        <strong>README-BACKEND.md</strong>
        <br/>
        Instalación y levantamiento del backend con Spring Boot + PostgreSQL
      </a>
    </td>
    <td align="center">
      <a href="./frontend/README-FRONTEND.md">
        <img src="https://img.shields.io/badge/🎨_Guía_Frontend-Angular_17-DD0031?style=for-the-badge" />
        <br/>
        <strong>README-FRONTEND.md</strong>
        <br/>
        Instalación y levantamiento del frontend con Angular 17
      </a>
    </td>
  </tr>
</table>

> 💡 **Recomendación:** Levanta primero el backend y luego el frontend para una experiencia de desarrollo completa.

---

## 🌍 Culturas Soportadas

| Cultura | Región | Elementos Narrativos |
|---|---|---|
| 🏔️ **Andina** | Sierra central y sur | Apu, Pachamama, cosmovisión quechua |
| 🌿 **Amazónica** | Selva peruana | Espíritus del río, chamanes, asháninka |
| 🥁 **Afroperuana** | Costa sur | Cajón, festejo, identidad afrodescendiente |
| 🐟 **Costeña** | Litoral pacífico | Leyendas del mar, tradición pesquera |

---

---

## 📊 Resultados de las Pruebas

| Indicador | Meta | Resultado | Estado |
|---|---|---|---|
| Pertinencia cultural IA | ≥ 85% | **88.5%** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |
| Precisión del Modelo Vocacional | ≥ 75% | **84.2%** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |
| Exactitud de Predicción | ≥ 70% | **78.5%** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |
| Tiempo de generación narrativa | ≤ 5 seg | **4.1 seg** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |
| Operatividad offline | ≥ 95% | **95%** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |
| Precisión Speech-to-Text | ≥ 80% | **82%** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |
| Satisfacción general usuarios | ≥ 80% | **85%** | ![Success](https://img.shields.io/badge/-PASSED-success?style=flat-square) |

---

## 🌿 Impacto de Sostenibilidad

CulturaStory AI está comprometido con un desarrollo tecnológico responsable y de bajo impacto:

> [!TIP]
> **Eficiencia Algorítmica**: Priorizamos el uso de modelos "Flash" para reducir la huella de carbono digital sin sacrificar la calidad narrativa.

- 👣 **Huella de Carbono Digital**: Emisión estimada de **0.45g CO2e** por narrativa, mitigada mediante optimización de prompts.
- ⚡ **Consumo de Energía**: Reducción del **30%** en llamadas redundantes mediante arquitectura orientada a la eficiencia (Proxy & Cache).
- 🎨 **Sostenibilidad Cultural**: Preservación activa de dialectos y giros lingüísticos locales para evitar la homogeneización cultural.
- ⚖️ **IA Ética**: Gobernanza de datos centrada en el respeto a la propiedad intelectual comunitaria.

---

## 💰 Gestión Financiera (Presupuesto Huancayo 2026)

> [!IMPORTANT]
> **Ventaja Competitiva**: Operar desde Huancayo permite una reducción del **20% en costos operativos** comparado con Lima, manteniendo acceso a talento de élite.

### 👥 1. Planilla de Desarrollo (Talento Local)

| Rol | Cantidad | Pago Mensual | Total (5 meses) |
|---|:---:|:---:|:---:|
| **Desarrollador Fullstack** | 2 | S/ 2,800 | S/ 28,000 |
| **Especialista en IA** | 1 | S/ 3,200 | S/ 16,000 |
| **Diseñador UX/UI** | 1 | S/ 1,500 | S/ 7,500 |
| **SUBTOTAL RR.HH.** | | | **S/ 51,500** |

### 🏢 2. Infraestructura y Operaciones

| Concepto | Detalle | Total |
|---|---|---|
| **Espacio de Trabajo** | Oficina Coworking (El Tambo) | S/ 4,500 |
| **Servicios Cloud** | Supabase / Gemini API | S/ 1,500 |
| **Logística Local** | Validación en comunidades | S/ 1,500 |
| **SUBTOTAL OPERATIVO** | | **S/ 7,500** |

### 📊 Resumen Ejecutivo del Presupuesto

| Item | Inversión (PEN) | Notas |
|---|---|---|
| **Línea Base de Costos** | **S/ 60,200** | Costos directos de ejecución. |
| **Reserva de Contingencia (10%)** | S/ 6,020 | Gestión de riesgos técnicos. |
| **Reserva de Gestión (5%)** | S/ 3,010 | Flexibilidad estratégica. |
| **PRESUPUESTO TOTAL (BAC)** | **S/ 69,230** | ![Budget](https://img.shields.io/badge/-TOTAL-blue?style=for-the-badge) |

---

## 🤝 Contribuidores

| Integrante | Rol Principal | LinkedIn |
|---|---|:---:|
| **Albornoz Peña, Jeferson** | Arquitectura & Backend | [🔗]() |
| **Calderon Huaman, Jerico** | Frontend & UX | [🔗]() |
| **Echevarrias Rojas, Miguel** | Especialista en IA | [🔗]() |
| **Landa Rojas, Alexander** | QA & Testing | [🔗]() |
| **Quispe Aquino, Junior** | DevOps & Cloud | [🔗]() |

---

## 🎯 ODS que Aporta

[![ODS 4](https://img.shields.io/badge/ODS_4-Educación_de_Calidad-C21928?style=for-the-badge&logo=un-foundation)](https://sdgs.un.org/goals/goal4)
[![ODS 10](https://img.shields.io/badge/ODS_10-Reducción_de_Desigualdades-E11484?style=for-the-badge&logo=un-foundation)](https://sdgs.un.org/goals/goal10)
[![ODS 11](https://img.shields.io/badge/ODS_11-Ciudades_Sostenibles-F99D26?style=for-the-badge&logo=un-foundation)](https://sdgs.un.org/goals/goal11)

---

<div align="center">

🌐 **Demo en producción:** [narrativas-digitales-culturales.vercel.app](https://narrativas-digitales-culturales.vercel.app)

**Universidad Continental** – Escuela de Ingeniería de Sistemas e Informática, Junín, Perú – 2026.

</div>
