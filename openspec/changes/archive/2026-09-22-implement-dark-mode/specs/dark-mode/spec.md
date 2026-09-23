# Spec Delta

## Purpose

Proporciona gestión del modo oscuro mediante una inversión monocromática fiel a la identidad suiza del portafolio, garantizando persistencia de preferencias, control accesible y navegación sin parpadeos.

## ADDED Requirements

### Requirement: Inversión Monocromática del Sistema Visual
The system SHALL implement an exact monochromatic dark theme that inverts the light palette using OKLCH tokens, preserving deep ink background (`oklch(9% 0 0)`), subtle paper surfaces (`oklch(13% 0 0)`), high-contrast ivory text (`oklch(97% 0 0)`), hairline borders (`oklch(22% 0 0)`), and functional Signal Emerald (`--color-available`).

#### Scenario: Visualización en modo oscuro activado
- **WHEN** la clase `.dark` está presente en la etiqueta raíz `<html>`
- **THEN** el fondo de la página se renderiza en tinta profunda y el texto principal se renderiza en marfil de alto contraste, sin fondos blancos residuales en contenedores o modales.

#### Scenario: Contraste y legibilidad tipográfica
- **WHEN** cualquier página o componente se visualiza bajo el modo oscuro
- **THEN** la relación de contraste entre los textos de lectura (títulos en Bebas Neue y cuerpo en Barlow) y el fondo cumple como mínimo el estándar WCAG AA (4.5:1 para texto normal, 3:1 para texto grande).

### Requirement: Control Accesible de Alternancia de Tema (Theme Toggle)
The system SHALL provide an accessible interactive toggle button in the site header (`Header.astro`) and in the mobile navigation drawer to switch between light and dark themes.

#### Scenario: Usuario pulsa el botón de tema
- **WHEN** el usuario hace clic o presiona Enter/Espacio sobre el botón de alternancia de tema
- **THEN** el tema cambia inmediatamente de claro a oscuro (o viceversa), se actualiza el icono y el atributo `aria-label` refleja el nuevo estado accesible.

#### Scenario: Accesibilidad y foco por teclado
- **WHEN** un usuario navega hacia el control de tema utilizando la tecla Tab
- **THEN** el control recibe foco visible accesible con un área táctil mínima de 44x44px.

### Requirement: Persistencia de Preferencia y Detección del Sistema
The system SHALL persist the user's selected theme in `localStorage` under the key `theme`, and MUST respect the operating system preference (`prefers-color-scheme: dark`) when no explicit choice has been made.

#### Scenario: Primera visita respetando preferencia del sistema
- **WHEN** un usuario visita el sitio por primera vez sin preferencia previa guardada en `localStorage` y su sistema operativo tiene activo el modo oscuro
- **THEN** el portafolio se inicializa automáticamente en modo oscuro.

#### Scenario: Persistencia tras recargar la página
- **WHEN** un usuario selecciona el modo oscuro y recarga la página o abre una nueva pestaña del mismo sitio
- **THEN** el sitio se muestra de inmediato en modo oscuro según el valor almacenado en `localStorage`.

### Requirement: Prevención de Parpadeo en Carga Inicial (Anti-FOUC)
The system MUST resolve and apply the `.dark` class to `document.documentElement` synchronously before the document body renders to prevent visual flashing (Flash of Unstyled Content).

#### Scenario: Carga inicial de página
- **WHEN** el navegador descarga e interpreta el documento HTML inicial
- **THEN** un script síncrono en `<head>` evalúa `localStorage` y `matchMedia`, aplicando la clase `.dark` antes de que el cuerpo del documento (`<body>`) sea pintado.

### Requirement: Preservación de Estado en Navegación con View Transitions
The system MUST maintain the active theme state across client-side page transitions (`astro:transitions`), synchronizing both the document root and toggle button states.

#### Scenario: Navegación interna entre páginas
- **WHEN** el usuario navega de una página a otra (ej. de Inicio a Sobre mí o Proyectos) mediante ClientRouter de Astro
- **THEN** el tema seleccionado no sufre reseteos ni destellos claros y los botones de control de tema reflejan el estado actual en la nueva vista.
