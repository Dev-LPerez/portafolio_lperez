export type Project = {
  slug: string;
  title: string;
  category: string;
  year: number;
  summary: string;
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
  liveUrl?: string; // Enlace directo a la página web o demo en vivo
  githubUrl?: string; // Enlace al repositorio único de GitHub
  githubFrontendUrl?: string; // Enlace al repositorio Frontend
  githubBackendUrl?: string; // Enlace al repositorio Backend
  screenshots?: string[]; // Rutas de capturas de pantalla
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "sistema-gestion-refugios",
    title: "Sistema de Gestión de Refugios",
    category: "Web App",
    year: 2026,
    summary:
      "Plataforma de logística con backend modular en PHP, base de datos MySQL y frontend SPA en Vue 3 con TypeScript.",
    description:
      "Diseñé e implementé una arquitectura desacoplada aplicando principios de programación modular en el backend con PHP. Estructuré una base de datos relacional MySQL optimizada con tablas de seguimiento y auditoría nativa de registros. Para la capa de seguridad, implementé un middleware personalizado de autenticación con tokens JWT para la protección de endpoints críticos. El frontend fue desarrollado como una SPA reactiva con Vue 3, TypeScript y Tailwind CSS, integrando componentes dinámicos de carga inteligente y paneles de analítica.",
    tags: ["PHP", "MySQL", "Vue.js 3", "TypeScript", "JWT", "Tailwind CSS"],
    links: [],
    liveUrl: "https://sistema-refugio.lgperez.dev",
    githubFrontendUrl: "https://github.com/Dev-LPerez/SistemaRefugios_Frontend",
    githubBackendUrl: "https://github.com/Dev-LPerez/SistemaRefugios_Backend", // 👈 Ajusta la URL de tu repositorio backend si tiene otro nombre
    screenshots: [
      "/projects/refugios/refugio-1.png",
      "/projects/refugios/refugio-2.png",
      "/projects/refugios/refugio-3.png",
      "/projects/refugios/refugio-4.png",
      "/projects/refugios/refugio-5.png",
      "/projects/refugios/refugio-6.png",
    ],
    featured: true,
  },
  {
    slug: "nexlocal",
    title: "NexLocal",
    category: "Marketplace",
    year: 2026,
    summary:
      "Plataforma monolítica de turismo experiencial construida con Laravel 12 (PHP) y PostgreSQL, con sistema de reservas mediante Máquina de Estados Finitos.",
    description:
      "Arquitecté un monolito web escalable utilizando Laravel 12 y PHP, fundamentado en una rigurosa Programación Orientada a Objetos (POO) y respaldado por una base de datos relacional PostgreSQL. Diseñé un sistema basado en una Máquina de Estados Finitos para controlar con precisión el ciclo de vida de las reservas, gestionando concurrencia de cupos y cálculo automático de tarifas. Gestioné el control de versiones con Git colaborativo y apoyé el análisis y maquetación con uso estratégico de herramientas de IA para validación de lógica antes de producción.",
    tags: ["Laravel 12", "PHP", "PostgreSQL", "Monolito", "POO", "Git"],
    links: [],
    liveUrl: "https://nexlocal.lgperez.dev",
    githubUrl: "https://github.com/Dev-LPerez/Nexlocal",
    screenshots: [
      // "/projects/nexlocal-1.png",
      // "/projects/nexlocal-2.png",
    ],
    featured: true,
  }, {
    slug: "menu-digital-pos-integrado",
    title: "GomiFire — Menú Digital & POS Integrado",
    category: "E-Commerce / PWA",
    year: 2025,
    summary:
      "Progressive Web App (PWA) de comercio electrónico con catálogo reactivo, checkout con geolocalización GPS vía WhatsApp y panel administrativo POS con sincronización en tiempo real en Firebase.",
    description:
      "Desarrollé y modernicé una Progressive Web App (PWA) de alto rendimiento construida con React 19, TypeScript, Vite 6 y Tailwind CSS v4, conectada a Firebase Firestore (NoSQL en tiempo real) y Firebase Storage. Implementé una experiencia de usuario fluida y reactiva con layout adaptativo (PC/Movil), navegación por categorías con smooth scroll y checkout automatizado con geolocalización GPS hacia la API de WhatsApp. En el apartado administrativo, diseñé un panel POS secreto con control de sesiones, deducción automática de inventario por pedido, compresión en cliente de imágenes a WebP (~25 KB) para carga instantánea, y un módulo financiero con métricas de ventas, ticket promedio, margen neto y desglose de cajas independientes.",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Firebase Firestore", "NoSQL", "PWA", "POS"],
    links: [],
    liveUrl: "https://gomifire.netlify.app",
    githubUrl: "https://github.com/Dev-LPerez/gomifire-menuapp",
    screenshots: [
      // "/projects/gomifire-1.png",
      // "/projects/gomifire-2.png",
    ],
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  const decoded = decodeURIComponent(slug).toLowerCase().trim();
  return projects.find(
    (p) =>
      p.slug === slug ||
      p.slug.toLowerCase() === decoded ||
      decodeURIComponent(p.slug).toLowerCase() === decoded
  );
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getRelatedProjects(slug: string, count = 2): Project[] {
  return projects.filter((p) => p.slug !== slug).slice(0, count);
}
