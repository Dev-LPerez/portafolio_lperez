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
    tags: ["PHP", "Prog. Modular", "MySQL", "Vue.js 3", "TypeScript", "JWT", "Tailwind CSS"],
    links: [],
    liveUrl: "https://sistema-refugio-frontend.vercel.app/",
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
    liveUrl: "https://nexlocal.up.railway.app/", // 👈 Coloca aquí el link de tu proyecto
    githubUrl: "https://github.com/Dev-LPerez/Nexlocal", // 👈 Coloca aquí el link de GitHub
    screenshots: [
      // "/projects/nexlocal-1.png",
      // "/projects/nexlocal-2.png",
    ],
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getRelatedProjects(slug: string, count = 2): Project[] {
  return projects.filter((p) => p.slug !== slug).slice(0, count);
}
