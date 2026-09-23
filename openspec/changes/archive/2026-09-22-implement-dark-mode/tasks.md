# Tasks

## 1. Tokens y Estilos de Inversión Monocromática

- [x] 1.1 Calibrar tokens OKLCH de `.dark` en `src/styles/globals.css` garantizando contraste WCAG AA, negros profundos (`oklch(9% 0 0)`), superficies sutiles (`oklch(13% 0 0)`), textos de alta legibilidad (`oklch(97% 0 0)`) y bordes de precisión. Verificar mediante inspección de estilos y contrast ratio.
- [x] 1.2 Auditar y reemplazar fondos rígidos `#ffffff` o valores inline (como el visor de certificados en `src/pages/sobre-mi.astro` y contenedores de imágenes) por variables semánticas (`var(--color-paper)` / `var(--color-background)`). Verificar que ningún componente presente fondos blancos anómalos bajo la clase `.dark`.

## 2. Prevención de FOUC e Integración en Layout

- [x] 2.1 Inyectar script bloqueante anti-FOUC en `<head>` de `src/layouts/Layout.astro` que evalúe `localStorage.getItem('theme')` y `prefers-color-scheme`, aplicando sincrónicamente la clase `.dark` a `<html>` antes del primer render. Verificar mediante recarga en navegador que no haya destello blanco al estar en modo oscuro.
- [x] 2.2 Implementar sincronización del tema con el ciclo de vida de View Transitions en `src/layouts/Layout.astro` mediante `astro:after-swap`. Verificar que al navegar entre rutas con `ClientRouter` el tema oscuro persista sin parpadeos.

## 3. Componente y Lógica de Theme Toggle

- [x] 3.1 Crear el componente accesible `ThemeToggle.astro` con iconos vectoriales de Sol y Luna, target táctil de al menos 44px, `aria-label` descriptivo y microinteracciones de rotación/escala. Verificar estructura accesible y foco de teclado.
- [x] 3.2 Integrar `ThemeToggle` en la barra de navegación de `src/components/Header.astro` (escritorio) y dentro del drawer móvil desplegable. Verificar alineación visual y comportamiento responsivo en móviles y pantallas grandes.
- [x] 3.3 Implementar el script de interacción para alternar el tema al hacer clic, persistir la selección en `localStorage`, actualizar la clase `.dark` y sincronizar los botones en cada carga de página (`astro:page-load`). Verificar que el clic alterne el tema instantáneamente y actualice el estado en ambas ubicaciones.

## 4. Verificación y Construcción

- [x] 4.1 Ejecutar `npm run build` para asegurar que no existan errores de compilación, sintaxis Astro o TypeScript. Verificar que el proceso finalice con código de salida 0.
- [x] 4.2 Validar la navegación completa a través de todas las secciones (`/`, `/sobre-mi`, `/proyectos`, `/contacto`) verificando que todos los textos, bordes, modales y enlaces mantengan la doctrina de inversión monocromática suiza.
