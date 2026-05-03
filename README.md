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

## 📊 Resultados de las Pruebas

| Indicador | Meta | Resultado | Estado |
|---|---|---|---|
| Pertinencia cultural IA | ≥ 85% | 88.5% | ✅ |
| Precisión del Modelo Vocacional | ≥ 75% | 84.2% | ✅ |
| Exactitud de Predicción | ≥ 70% | 78.5% | ✅ |
| Tiempo de generación narrativa | ≤ 5 seg | 4.1 seg | ✅ |
| Operatividad offline | ≥ 95% | 95% | ✅ |
| Precisión Speech-to-Text | ≥ 80% | 82% | ✅ |
| Satisfacción general usuarios | ≥ 80% | 85% | ✅ |

---

## 🌿 Impacto de Sostenibilidad

CulturaStory AI está comprometido con un desarrollo tecnológico responsable y sostenible:

- **Huella de Carbono Digital**: Se estima una emisión de **0.45g CO2e** por cada narrativa generada, optimizada mediante el uso de modelos "Flash" de baja latencia y menor consumo computacional.
- **Consumo de Energía**: Implementación del patrón **Proxy** y **Cache Strategy** para reducir en un 30% las llamadas redundantes a servicios de IA en la nube, disminuyendo el uso de servidores.
- **Sostenibilidad Cultural**: El proyecto preserva el patrimonio inmaterial sin "estandarizar" los relatos, respetando dialectos y giros lingüísticos locales, lo que asegura la sostenibilidad de la identidad comunitaria.
- **Uso Ético de la IA**: Algoritmos diseñados para evitar sesgos cognitivos y promover la diversidad cultural peruana.

---

## 💰 Gestión Financiera (Presupuesto Huancayo 2026)


### 1. Planilla de Desarrollo (Talento Local)
En Huancayo, los sueldos permiten optimizar el presupuesto inicial sin sacrificar calidad:

| Rol | Cantidad | Pago Mensual | Total (5 meses) |
|---|---|---|---|
| **Desarrollador Fullstack** (Egresado) | 2 | S/ 2,800 | S/ 28,000 |
| **Especialista en IA** (Consultoría por hitos) | 1 | S/ 3,200 | S/ 16,000 |
| **Diseñador UX/UI / Practicante** | 1 | S/ 1,500 | S/ 7,500 |
| **Subtotal RR.HH.** | | | **S/ 51,500** |

### 2. Infraestructura y Operaciones
Aprovechando la oferta en zonas como El Tambo o el Centro:

- **Espacio de Trabajo**: Oficina o coworking (inc. servicios): **S/ 4,500** (S/ 900 x 5 meses).
- **Servicios Cloud** (Supabase/Gemini API): **S/ 1,500** (S/ 300 x 5 meses aprox).
- **Logística Local**: Pruebas en comunidades (Chanchamayo/Zonas Andinas): **S/ 1,500**.
- **Subtotal Operativo**: **S/ 7,500**

### 3. Constitución y Legal
Trámites aterrizados a tarifas de la Incontrastable:

- **Formalización (S.A.C. o S.A.C.S.)**: S/ 800 (Notaría local + SUNARP).
- **Licencia Municipal (El Tambo/Huancayo)**: S/ 400.
- **Subtotal Legal**: **S/ 1,200**

### 📊 Resumen del Presupuesto (MVP 5 meses)

| Concepto | Monto (Soles - PEN) | Descripción |
|---|---|---|
| **Línea Base (Costos Directos)** | **S/ 60,200** | Suma de RR.HH., Operaciones y Legal. |
| **Reserva de Contingencia (10%)** | S/ 6,020 | Mitigación de riesgos técnicos o de mercado. |
| **Reserva de Gestión (5%)** | S/ 3,010 | Imprevistos estratégicos fuera de la línea base. |
| **Presupuesto Total (BAC)** | **S/ 69,230** | Monto total para el éxito del piloto. |

---

## 🤝 Contribuidores

| Integrante | Participación |
|---|---|
| Albornoz Peña, Jeferson | 100% |
| Calderon Huaman, Jerico | 100% |
| Echevarrias Rojas, Miguel | 100% |
| Landa Rojas, Alexander | 100% |
| Quispe Aquino, Junior | 100% |

**Universidad Continental** – Escuela Académica Profesional de Ingeniería de Sistemas e Informática, Junín, Perú – 2025.

---

## 🎯 ODS que Aporta

- 🎓 **ODS 4** – Educación de Calidad: herramientas educativas innovadoras con pertinencia cultural
- ⚖️ **ODS 10** – Reducción de Desigualdades: acceso a IA educativa en zonas rurales
- 🏛️ **ODS 11** – Ciudades y Comunidades Sostenibles: preservación del patrimonio cultural intangible

---

<div align="center">

🌐 **Demo en producción:** [narrativas-digitales-culturales.vercel.app](https://narrativas-digitales-culturales.vercel.app)

</div>
