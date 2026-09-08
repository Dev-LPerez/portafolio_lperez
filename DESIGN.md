---
name: Luis Guillermo Pérez Rubio — Engineering Portfolio
description: Minimalist, architectural Swiss-inspired software engineering showcase with tactile editorial hierarchy.
colors:
  primary: "#161616"
  primary-soft: "#4a4a4a"
  neutral-bg: "#ffffff"
  neutral-paper: "#f7f7f7"
  border: "#dedede"
  rule: "#cccccc"
  status-available: "#22c55e"
typography:
  display:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(2.5rem, 8.5vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(1.35rem, 3.2vw, 2.15rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Barlow', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "'Barlow', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "'Barlow', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  tag:
    backgroundColor: "{colors.neutral-paper}"
    textColor: "{colors.primary-soft}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: Luis Guillermo Pérez Rubio Portfolio

## Overview

**Creative North Star: "The Structural Blueprint"**

An architectural, modernist Swiss aesthetic that treats software engineering as high-precision craft. The portfolio prioritizes content density, crisp typographic hierarchy, and purposeful physical feedback over ornamental noise.

The visual language communicates disciplined engineering authority: pure monochrome contrasts, rigorous hairline rules, generous spatial rhythm, and responsive View Transitions that mimic physical layout expansions.

**Key Characteristics:**
- Strict monochrome base calibrated in OKLCH with functional signal emerald for real-time availability.
- Monumental display headlines in Bebas Neue paired with readable Barlow body text.
- Compact 1080px maximum container width providing immediate scanning density without horizontal sprawl.
- 1px hairline rules anchoring modular content blocks, timeline tracks, and editorial project rows.
- Tactile interactive primitives: institutional emblems, certificate zoom overlays, and responsive mobile drawers.

## Colors

A high-contrast monochrome system calibrated in OKLCH for perceptual uniformity and seamless dark-mode inversion.

### Primary
- **Deep Ink** (#161616 / `oklch(9% 0 0)`): Primary headings, solid buttons, authoritative branding marks.

### Neutral
- **Clean Canvas** (#ffffff / `oklch(100% 0 0)`): Surface base and background.
- **Cool Paper** (#f7f7f7 / `oklch(97% 0 0)`): Subdued card backgrounds, status strips, and interactive rows.
- **Hairline Border** (#dedede / `oklch(87% 0 0)`): Component borders, tags, and card frames.
- **Structural Rule** (#cccccc / `oklch(80% 0 0)`): Section dividers and grid separators.
- **Muted Ink** (#4a4a4a / `oklch(30% 0 0)`): Secondary descriptions, summaries, and technical specs.

### Status
- **Signal Emerald** (#22c55e / `oklch(65% 0.17 145)`): Pulse indicator for immediate availability.

### Named Rules
**The Rarity Rule.** Color is reserved exclusively for vital status (availability dot) and code syntax. The entire interface remains monochrome so project artifacts lead.
**The Inversion Doctrine.** Dark mode is an exact perceptual inversion of lightness channels, preserving the crisp hairline geometry without introducing muddy shadows.

## Typography

**Display Font:** Bebas Neue, sans-serif  
**Body Font:** Barlow, sans-serif  

**Character:** Technical authority meets Swiss poster design. Large display headers command immediate attention, while neutral sans-serif body type ensures effortless reading.

### Hierarchy
- **Display** (400, `clamp(2.5rem, 8.5vw, 6.5rem)`, 0.92): Hero title, section headers.
- **Headline** (400, `clamp(1.35rem, 3.2vw, 2.15rem)`, 1.0): Project names, case study titles, and sheet links.
- **Title** (600, `1.15rem`, 1.35): Timeline roles, modal titles, skill headers.
- **Body** (400, `1rem` / `0.9375rem`, 1.65): Biographies, technical summaries, narrative descriptions. Max line length: 65–70ch.
- **Label** (600, `0.75rem`, 1.4): Uppercase tags, category indicators, column labels, tabular numbers.

### Named Rules
**The Bebas Horizon Rule.** All major structural sections open with an uppercase Bebas Neue headline tracking at -0.01em with a tight line-height of 0.92, grounding the section before narrative copy unfolds.

## Layout

A compact, disciplined spatial framework built on a **1080px maximum container** with responsive inline gutters (1.25rem mobile to 2.0rem desktop). Rhythmic 1px hairline dividers separate structural sections, keeping content scannable on ultra-wide screens without empty horizontal voids.

### Breakpoints
- **Mobile Base:** `< 480px` — stacked actions, full-bleed touch drawers.
- **Phablet / Small Tablet:** `480px` – `640px` — dual-column stats, wrapped action bars.
- **Tablet:** `768px` — desktop header navigation emerges, 3-column project grid activates.
- **Desktop:** `1024px+` — 4-column footer, multi-column skill matrices, 1080px container cap.

## Elevation & Depth

Surfaces are fundamentally flat at rest, honoring print engineering blueprints. Elevation is tonal and border-driven, activating soft ambient shadow offsets only upon deliberate cursor hover (`translateY(-3px)` with `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08)`).

### Shadow Vocabulary
- **Subtle Surface** (`box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)`): Rest state for interactive emblems and thumbnails.
- **Elevated Hover** (`box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.12)`): Active hover for buttons, cards, and logo triggers.
- **Modal Depth** (`box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6)`): Floating focus container for certificate inspections and institutional shields.

### Named Rules
**The Flat-By-Default Rule.** Surfaces remain anchored on the canvas at rest. Depth is never an ornament; it only signals interactivity or active modal focus.

## Shapes

Sharp, disciplined form language. Primitives utilize minimal radii (4px `rounded.sm` for buttons, badges, and tags; 8px `rounded.md` for browser mockups and modal envelopes) to maintain an architectural, technical silhouette.

## Components

### Buttons
- **Shape:** 4px radius (`var(--radius-sm)`), 44px minimum touch target.
- **Primary:** Solid `#161616` background, `#ffffff` text, padding `12px 24px`. Hover transitions smoothly to muted `#4a4a4a`.
- **Outline:** Transparent background, `#161616` 1.5px border, inverting text and background upon hover.

### Project Rows & Cards
- **Editorial Row:** 4-column grid (numerical index, thumbnail/mockup, title/summary/tags, directional arrow). Translates horizontally (`translateX(4px)`) on hover.
- **Interactive Mockup:** Responsive browser chrome frame with aspect ratio preservation (16:10), traffic-light dots, and touch swipe badge on mobile devices.

### Education & Institutional Emblem
- **Institutional Emblem:** Enclosed white tile with 1px border (`#dedede`), displaying university coat of arms. Interactive hover reveals an icon zoom badge and triggers a focused inspection modal.
- **Institution Link:** Inline link with external arrow indicator (`↗`), preserving semantic separation between image zoom and institutional portal navigation.

### Tags & Chips
- **Style:** Compact uppercase text (`0.7rem`, weight 600, letter-spacing 0.06em), `#f7f7f7` background with 1px hairline border, 4px border radius.

### Mobile Navigation Drawer
- **Drawer Sheet:** Fixed full-screen backdrop with 8px blur, slide-down panel with uppercase oversized navigation items, direct email contact trigger, and social shortcuts.

## Do's and Don'ts

### Do:
- **Do** preserve the strict monochrome color discipline across all new screens and components.
- **Do** use `var(--color-ink)` and `var(--color-background)` tokens to ensure seamless dark mode adaptability.
- **Do** maintain a strict 44px minimum touch target for every interactive button, link, and trigger.
- **Do** provide explicit accessible names (`aria-label`) and keyboard triggers (`Escape`, `Enter`) on all interactive dialogs.
- **Do** respect `prefers-reduced-motion` across all view transitions, pulse animations, and hover transforms.

### Don't:
- **Don't** introduce colored background cards, pastel tints, or decorative gradient text.
- **Don't** use generic unicode emojis in place of clean, authored SVG icons from `TechIcon`.
- **Don't** exceed the 1080px maximum container width on standard page sections.
- **Don't** break tabular numeric alignment in counters or timeline dates.