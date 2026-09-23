# Proposal

## Why

El portafolio actual presenta una estética suiza y arquitectónica predominantemente clara (monocromática con base blanca). Implementar un modo oscuro con inversión tonal exacta ("The Inversion Doctrine" especificada en DESIGN.md) reduce la fatiga visual en entornos de poca luz, mejora la accesibilidad del usuario y refuerza la identidad técnica del desarrollador, manteniendo la disciplina estética y el alto contraste sin introducir sombras turbias ni tintes ornamentales.

## What Changes

- **Inversión monocromática completa**: Aplicación de la doctrina de inversión visual basada en tokens OKLCH predefinidos (`globals.css`), transformando fondos blancos en tinta profunda (`oklch(9% 0 0)`), texto en marfil/tinta clara (`oklch(97% 0 0)`), y bordes en líneas de precisión (`oklch(22% 0 0)`), preservando intacto el verde esmeralda de disponibilidad (`--color-available`).
- **Selector de tema (Theme Toggle)**: Integración de un control accesible de alternancia entre modo claro y modo oscuro en el encabezado (`Header.astro`), tanto en la vista de escritorio como en el menú móvil lateral/drawer.
- **Prevención de FOUC (Flash of Unstyled Content)**: Script inline síncrono y bloqueante en el `<head>` de `Layout.astro` que evalúa la preferencia guardada en `localStorage` o la preferencia del sistema operativo (`prefers-color-scheme`), aplicando la clase `.dark` a `<html>` antes del primer renderizado.
- **Sincronización con Astro View Transitions**: Preservación del estado del tema a través de navegaciones cliente usando los eventos de ciclo de vida de Astro (`astro:after-swap` / `astro:page-load`).
- **Auditoría y corrección de estilos directos**: Sustitución de colores planos o duros (como `#ffffff` en modales, fondos de tarjetas y certificados) por variables semánticas o clases temáticas que se adapten a la inversión.

## Capabilities

### New Capabilities
- `dark-mode`: Gestión de tema claro/oscuro para el portafolio, incluyendo persistencia local, detección de preferencias del sistema, botón de alternancia accesible y visualización monocromática invertida de todos los componentes y páginas.

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- **Componentes y Layouts**: `src/layouts/Layout.astro`, `src/components/Header.astro`, `src/components/Logo.astro`, `src/styles/globals.css`.
- **Páginas y Modales**: `src/pages/index.astro`, `src/pages/sobre-mi.astro`, `src/pages/proyectos.astro`, `src/pages/contacto.astro`, componentes interactivos de certificados y proyectos en React (`ProjectCarousel.tsx`, `CertificatesList.tsx`).
- **Dependencias**: Cero nuevas dependencias externas requeridas (implementación nativa con CSS variables y TypeScript/Astro).
