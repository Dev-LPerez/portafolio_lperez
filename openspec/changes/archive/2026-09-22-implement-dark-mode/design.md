# Design

## Context

El proyecto está construido con Astro 7, Tailwind CSS v4 y `@astrojs/react`, utilizando `ClientRouter` para transiciones de vista (View Transitions). El sistema de diseño (`DESIGN.md`) define "The Inversion Doctrine": una inversión perceptual exacta en coordenadas OKLCH manteniendo geometría de líneas finas (1px hairline) y sin sombras turbias.

En `src/styles/globals.css` ya existen variables base en `:root` y una definición preliminar en `.dark`, pero actualmente no existe mecanismo de alternancia, persistencia, detección del sistema, ni integración con el ciclo de vida de View Transitions, además de existir algunos estilos en línea con colores rígidos (`#ffffff`).

## Goals / Non-Goals

**Goals:**
- Inversión visual monocromática completa y consistente en todas las vistas (`/`, `/sobre-mi`, `/proyectos`, `/contacto`).
- Prevención total de parpadeo en blanco (FOUC) durante la carga inicial y navegación interna.
- Botón de alternancia de tema accesible (WCAG AA, foco visible, área táctil >= 44px) en encabezado de escritorio y menú móvil desplegable.
- Persistencia de la selección en `localStorage` con fallback automático a `prefers-color-scheme`.
- Compatibilidad perfecta con Astro View Transitions (`astro:after-swap` y `astro:page-load`).
- Adaptación de modales, tarjetas e imágenes para que no desentonen con la estética oscura.

**Non-Goals:**
- Múltiples paletas cromáticas (solo se contempla la dicotomía monocromática estricta: claro vs. oscuro).
- Alterar logos de marcas o certificados educativos más allá de asegurar su legibilidad mediante marcos y bordes de contraste.

## Decisions

### 1. Manejo de Estado mediante Clase `.dark` en `document.documentElement`
- **Decisión**: El tema se gobernará exclusivamente mediante la presencia o ausencia de la clase `.dark` en la etiqueta `<html>`, la cual redefine las variables de diseño OKLCH (`--color-background`, `--color-paper`, `--color-ink`, `--color-border`, etc.).
- **Razón**: Permite compatibilidad nativa tanto con Tailwind v4 como con CSS puro y componentes en React o Astro, asegurando herencia inmediata en todo el árbol DOM.
- **Alternativas consideradas**:
  - *Tailwind selector de medios puro (`media`)*: No permitiría al usuario forzar un tema distinto al del sistema.
  - *Atributo `data-theme`*: Válido, pero `.dark` es el estándar idiomático alineado con Tailwind v4 y los estilos ya presentes en `globals.css`.

### 2. Prevención de FOUC con Script Bloqueante en `<head>`
- **Decisión**: Inyectar un script síncrono `<script is:inline>` directamente en el `<head>` de `Layout.astro`.
- **Razón**: Al ejecutarse de forma inline antes del renderizado del `<body>`, evalúa `localStorage.getItem('theme')` o `window.matchMedia('(prefers-color-scheme: dark)').matches` y agrega la clase `.dark` instantáneamente, eliminando cualquier destello blanco.
- **Alternativas consideradas**:
  - *Inicialización en componente de React o script diferido*: Invariablemente provoca un destello blanco perceptible al recargar la página.

### 3. Sincronización con Astro View Transitions
- **Decisión**: Escuchar el evento `astro:after-swap` para transferir la clase `.dark` del documento previo al nuevo documento antes de que se pinte en pantalla, y `astro:page-load` para enlazar los listeners de los botones de alternancia.
- **Razón**: Astro reemplaza el contenido del documento en cada navegación; sin este manejo, el estado visual se restablecería o se desincronizarían los botones.
- **Alternativas consideradas**:
  - *Desactivar View Transitions*: Incompatible con la experiencia fluida del portafolio.

### 4. Componente Reutilizable `ThemeToggle.astro`
- **Decisión**: Diseñar un componente accesible `ThemeToggle.astro` con iconos SVG vectoriales minimalistas para sol/luna, con transiciones de escala y rotación suaves, colocado en el `Header.astro` junto a los controles de navegación y replicado en el drawer móvil.
- **Razón**: Proporciona consistencia visual y asegura el cumplimiento del objetivo táctil de 44px definido en `DESIGN.md`.
- **Alternativas consideradas**:
  - *Solo en menú móvil*: Mala experiencia en escritorio.
  - *Switch tipo toggle deslizante*: Menos acorde con la iconografía arquitectónica y minimalista del sitio.

### 5. Auditoría de Componentes y Fondos Rígidos
- **Decisión**: Reemplazar valores fijos como `background-color: #ffffff;` (presentes por ejemplo en el modal de certificados en `sobre-mi.astro`) por `var(--color-paper)` o `var(--color-background)`, añadiendo sutiles bordes de contraste (`var(--color-border)`).
- **Razón**: Evita bloques blancos deslumbrantes cuando el usuario interactúa con modales o tarjetas en modo oscuro.

## Risks / Trade-offs

- **[Riesgo: Destello durante navegación rápida con View Transitions]** → *Mitigación*: Implementar un listener síncrono en `astro:after-swap` que verifique el estado en `localStorage` o en el documento saliente y reasigne la clase al documento entrante de inmediato.
- **[Riesgo: Documentos y certificados escaneados con fondo blanco]** → *Mitigación*: Envolver imágenes de certificados dentro de tarjetas con borde visible `var(--color-border)` y fondo atenuado para que se perciban como documentos físicos montados con elegancia sobre el lienzo oscuro.
- **[Riesgo: Falta de contraste en enlaces de redes o logos]** → *Mitigación*: Verificar con contrast-ratio que todos los textos y bordes cumplan al menos 4.5:1 en modo oscuro.
