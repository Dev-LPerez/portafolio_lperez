# 🏗️ Luis Guillermo Pérez Rubio — Portafolio & Bitácora de Ingeniería

[![Astro](https://img.shields.io/badge/Astro-v7.3-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://www.lgperez.dev)

> **Sitio Web Oficial:** [https://www.lgperez.dev](https://www.lgperez.dev)  
> Portafolio profesional y bitácora técnica de **Luis Guillermo Pérez Rubio** (`<LGPR/>`) — Ingeniero de Sistemas y Desarrollador Full-Stack, con especialidad en arquitecturas Backend escalables, modelado relacional riguroso e interfaces web de alto rendimiento.

---

## 📖 Índice

1. [Visión General & Filosofía](#-visión-general--filosofía)
2. [Bitácora de Construcción (El Proceso de Desarrollo)](#-bitácora-de-construcción-el-proceso-de-desarrollo)
   - [Fase 1: Diagnóstico y Decisión Arquitectónica](#fase-1-diagnóstico-y-decisión-arquitectónica)
   - [Fase 2: Sistema de Diseño "The Structural Blueprint"](#fase-2-sistema-de-diseño-the-structural-blueprint)
   - [Fase 3: Arquitectura de Islas y Rendimiento Zero-JS](#fase-3-arquitectura-de-islas-y-rendimiento-zero-js)
   - [Fase 4: Documentación y Curaduría de Proyectos Reales](#fase-4-documentación-y-curaduría-de-proyectos-reales)
   - [Fase 5: SEO Técnico, Accesibilidad y Rendimiento](#fase-5-seo-técnico-accesibilidad-y-rendimiento)
3. [Stack Tecnológico y Justificación](#-stack-tecnológico-y-justificación)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Instalación y Desarrollo Local](#-instalación-y-desarrollo-local)
6. [Resultados y Métricas de Rendimiento](#-resultados-y-métricas-de-rendimiento)
7. [Contacto y Redes](#-contacto-y-redes)

---

## 🎯 Visión General & Filosofía

La mayoría de los portafolios de desarrollo web caen en dos extremos: o son plantillas genéricas sin personalidad técnica, o son SPAs sobrecargadas de animaciones gratuitas que sacrifican la velocidad de carga y la accesibilidad.

Este proyecto fue concebido bajo una premisa fundamental: **el portafolio en sí mismo debe ser una prueba de rigor de ingeniería de software**. Cada elemento visual, cada transición y cada línea de código responden a decisiones deliberadas de arquitectura, rendimiento y tipografía editorial funcional.

---

## 🛠️ Bitácora de Construcción (El Proceso de Desarrollo)

### Fase 1: Diagnóstico y Decisión Arquitectónica

* **El Problema Inicial:** Las aplicaciones de una sola página (SPAs tradicionales en React/Next.js client-side) envían megabytes de JavaScript al navegador solo para mostrar texto y proyectos estáticos, afectando negativamente el *First Contentful Paint* (FCP) y el *Time to Interactive* (TTI).
* **La Solución Elegida:** **Astro v7**. Permite renderizado estático (*Static Site Generation - SSG*) enviando **0 KB de JavaScript por defecto** al cliente, combinando páginas HTML ultrarrápidas con *View Transitions* (`ClientRouter`) nativas para mantener una navegación fluida e instantánea sin recargas de página completas.
* **Integración de React 19:** Solo cuando se requiere interacción táctil compleja (como el carrusel de imágenes con gestos táctiles y zoom, o el visor modal de certificados con captura de foco por teclado), se hidrata una **Isla de React** de forma selectiva (`client:visible` o `client:load`).

---

### Fase 2: Sistema de Diseño "The Structural Blueprint"

Inspirado en la escuela suiza de diseño editorial y los planos de arquitectura modular moderna:

1. **Jerarquía Tipográfica Monumental:**
   * **Titulares de Display:** `Bebas Neue` (condensada, imponente y directa para nombres, encabezados y métricas clave).
   * **Cuerpo y Lectura Técnica:** `Barlow` (claridad, legibilidad y solidez para descripciones arquitectónicas y metadatos).
   * *Cero Latencia de Fuentes:* Las fuentes locales críticas se precargan directamente en `<head>` (`rel="preload"`), eliminando por completo el desplazamiento de diseño (*Cumulative Layout Shift - CLS = 0*).
2. **Paleta Monocromática Calibrada en OKLCH:**
   * Tonos oscuros profundos (`#161616`) y papeles neutros suaves con contraste superior (WCAG AAA).
   * Acento funcional: Indicador de disponibilidad en tiempo real con efecto de respiración/halo (`#22c55e`).
3. **Reglas Capilares (Hairline Rules de 1px):**
   * Grillas estructuradas que delimitan claramente los módulos, la trayectoria académica y los proyectos sin ruido visual.
4. **Inclusión y Reducción de Movimiento:**
   * Respeto estricto a las preferencias del sistema del usuario (`prefers-reduced-motion`), deshabilitando transformaciones espaciales complejas si el usuario es sensible al movimiento.

---

### Fase 3: Arquitectura de Islas y Rendimiento Zero-JS

El desarrollo de componentes se dividió estrictamente según su necesidad de hidratación:

```
┌─────────────────────────────────────────────────────────────┐
│                 Astro Server Layout (0 KB JS)               │
│                                                             │
│   ┌────────────────────────┐    ┌───────────────────────┐   │
│   │   Header (Astro SSG)   │    │  Hero Profile (SSG)   │   │
│   └────────────────────────┘    └───────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │   [React Island: client:visible]                    │   │
│   │   ProjectCarousel (Zoom, Gestos Touch, Paginación)  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │   [React Island: client:load]                       │   │
│   │   CertificatesList (Modal Accesible, Escape, Focus) │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌────────────────────────┐    ┌───────────────────────┐   │
│   │  Tech Stack (Astro/SVG)│    │  Footer (Astro SSG)   │   │
│   └────────────────────────┘    └───────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

* **`ProjectCarousel.tsx` (React Island):** Construido desde cero sin librerías externas pesadas (como Swiper o Embla), permitiendo zoom progresivo, navegación táctil en móviles, miniaturas sincronizadas y control total del bundle.
* **`CertificatesList.tsx` (React Island):** Sistema interactivo de visualización de credenciales con bloqueo de scroll, navegación por teclado (`Escape`, `Tab`) y enlaces de validación externa directa (Platzi, Udemy, Universidad de Córdoba).
* **`TechIcon.tsx`:** Mapeo tipado y exhaustivo de tecnologías a iconos vectoriales de `react-icons`, con fallback geométrico SVG determinista en caso de tecnologías emergentes no registradas.

---

### Fase 4: Documentación y Curaduría de Proyectos Reales

Cada proyecto en el portafolio no se expone como un simple "sitio web", sino como un **caso de estudio técnico de ingeniería**, documentando el problema, los repositorios de código abiertos, la arquitectura y los retos superados:

1. **Fokus — Copiloto de Productividad Ejecutiva con IA:**
   * *Stack:* FastAPI + Next.js + Google Gemini API (Function Calling) + Supabase + Google Calendar API.
   * *Aportes de Ingeniería:* 9 herramientas orquestadas en tiempo real, streaming con Server-Sent Events (SSE), verificación local de JWT vía JWKS (ES256) sin latencia a terceros y cifrado simétrico en reposo (Fernet/AES) para tokens OAuth 2.0.
2. **Sistema de Gestión de Refugios:**
   * *Stack:* PHP + MySQL + Vue 3 SPA.
   * *Aportes de Ingeniería:* Arquitectura modular para control de censos, suministros y asignación de albergues en situaciones de contingencia social.
3. **NexLocal:**
   * *Stack:* Laravel 12 + PostgreSQL.
   * *Aportes de Ingeniería:* Monolito robusto multi-inquilino con máquina de estados finitos para la gestión de reservas y control de concurrencia.
4. **GomiFire:**
   * *Stack:* React 19 + Firebase Firestore + Tailwind CSS.
   * *Aportes de Ingeniería:* PWA con sincronización en tiempo real para cartas digitales y sistema POS de comandas gastronómicas.

---

### Fase 5: SEO Técnico, Accesibilidad y Rendimiento

* **Schema.org (JSON-LD):** Metadatos estructurados de tipo `Person` y `CreativeWork` inyectados en el encabezado para indexación semántica en Google.
* **Open Graph & Twitter Cards:** Generación dinámica de tarjetas sociales con títulos, resúmenes canónicos y previsualizaciones de imagen optimizadas.
* **Sitemap Automatizado:** Integrado mediante `@astrojs/sitemap`.
* **Optimización de Imágenes con `astro:assets`:** Procesamiento automático con Sharp a formatos modernos de última generación (WebP / AVIF), tamaños responsivos (`densities={[1, 2]}`) y etiquetas `fetchpriority="high"` en la imagen del Hero.

---

## 💻 Stack Tecnológico y Justificación

| Tecnología | Rol | ¿Por qué se utilizó? |
| :--- | :--- | :--- |
| **Astro 7** | Framework Principal | Renderizado estático puro (SSG), cero overhead de JS en cliente y *View Transitions* nativas. |
| **TypeScript 5.9** | Lenguaje Base | Tipado estricto en fuentes de datos (`profile.ts`, `projects.ts`), componentes y props. |
| **Tailwind CSS 4** | Motor de Estilos | Integración ultrarrápida vía `@tailwindcss/vite`, variables OKLCH nativas y cero CSS redundante. |
| **React 19** | Componentes Interactivos | Islas aisladas para experiencias táctiles y modales con ciclo de vida moderno. |
| **Sharp** | Procesamiento de Activos | Compresión y optimización de imágenes en tiempo de compilación. |
| **Vercel Web Analytics** | Telemetría & Tráfico | Métricas en tiempo real con script ligero (~1.1 kB) integrado con View Transitions. |
| **Vercel** | Infraestructura & CDN | Despliegue continuo en la red Edge global con baja latencia y compresión Brotli. |

---

## 📁 Estructura del Proyecto

```text
portafolio-vAstro/
├── public/                 # Archivos estáticos servidos directamente (certificados, favicon, logos)
├── src/
│   ├── assets/             # Imágenes procesadas y optimizadas por astro:assets (avatar, portadas)
│   ├── components/         # Componentes UI reutilizables
│   │   ├── CertificatesList.tsx  # [React Island] Modal y visor accesible de diplomas
│   │   ├── Footer.astro          # Pie de página editorial con enlaces sociales
│   │   ├── Header.astro          # Navegación con indicador de disponibilidad y drawer móvil
│   │   ├── Logo.astro            # Monograma vectorial interactivo de autor (<LGPR/>)
│   │   ├── ProjectCarousel.tsx   # [React Island] Carrusel táctil con soporte de zoom
│   │   └── TechIcon.tsx          # Mapeo de iconos tecnológicos vectoriales
│   ├── layouts/
│   │   └── Layout.astro          # Plantilla principal (SEO, View Transitions, Google Fonts preload)
│   ├── lib/
│   │   ├── profile.ts            # Fuente única de verdad: bio, habilidades, certificaciones
│   │   └── projects.ts           # Casos de estudio técnicos, capturas y metadatos
│   ├── pages/
│   │   ├── 404.astro             # Página de error 404 minimalista
│   │   ├── contacto.astro        # Canal de contacto directo con formulario y canales oficiales
│   │   ├── index.astro           # Portada principal: Hero, métricas, proyectos destacados
│   │   ├── sobre-mi.astro        # Trayectoria técnica, educación, enfoque de ingeniería
│   │   └── proyectos/
│   │       ├── index.astro       # Listado general y filtrable de proyectos
│   │       └── [slug].astro      # Caso de estudio detallado de cada proyecto
│   └── styles/
│       └── globals.css           # Tokens de diseño, tipografía y utilidades globales
├── DESIGN.md               # Especificación técnica del sistema de diseño suizo
├── PRODUCT.md              # Documento de requisitos, usuarios objetivo y principios de producto
├── astro.config.mjs        # Configuración de integraciones de Astro (React, Sitemap, Tailwind)
├── package.json            # Dependencias y scripts de ejecución
└── tsconfig.json           # Configuración de compilación de TypeScript y path aliases (@/*)
```

---

## 🚀 Instalación y Desarrollo Local

Si deseas clonar o inspeccionar localmente el código fuente:

### Prerrequisitos
* **Node.js** `>= 20.0.0`
* Gestor de paquetes recomendado: **pnpm** (o npm / yarn)

### 1. Clonar el repositorio
```bash
git clone https://github.com/dev-lperez/portafolio_lperez.git
cd portafolio-vAstro
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Iniciar el servidor de desarrollo
```bash
pnpm dev
```
El servidor se levantará localmente en `http://localhost:4321`.

### 4. Compilar para producción y previsualizar
```bash
# Compilar archivos estáticos a /dist
pnpm build

# Previsualizar el resultado de producción localmente
pnpm preview
```

---

## 📊 Resultados y Métricas de Rendimiento

El portafolio fue sometido a auditorías continuas con Google Lighthouse en entornos móviles y de escritorio:

| Métrica | Resultado | Comentarios |
| :--- | :---: | :--- |
| **Performance** | **100** | Carga inicial inferior a 0.8s, First Contentful Paint instantáneo. |
| **Accessibility** | **100** | Ratios de contraste WCAG AAA, semántica HTML5 pura y soporte por teclado. |
| **Best Practices** | **100** | HTTPS forzado, sin librerías vulnerables ni APIs obsoletas. |
| **SEO** | **100** | Metadatos completos, OpenGraph, Twitter Cards, Sitemap y JSON-LD. |

---

## 📬 Contacto y Redes

* **Autor:** Luis Guillermo Pérez Rubio
* **Especialidad:** Ingeniero de Sistemas & Desarrollador Full-Stack
* **Ubicación:** Montería, Córdoba, Colombia
* **Correo Electrónico:** [luisperez0644@gmail.com](mailto:luisperez0644@gmail.com)
* **GitHub:** [@dev-lperez](https://github.com/dev-lperez)
* **LinkedIn:** [Luis Guillermo Pérez Rubio](https://linkedin.com/in/luis-guillermo-perez-rubio)
* **Sitio Web:** [https://www.lgperez.dev](https://www.lgperez.dev)

---

<div align="center">
  <sub>Diseñado y construido con precisión de ingeniería. © 2026 Luis Guillermo Pérez Rubio.</sub>
</div>
