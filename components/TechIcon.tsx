import React from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiNestjs,
  SiLaravel,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiMongodb,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiHtml5,
  SiCss,
  SiGithub,
  SiPython,
  SiExpress,
  SiFastapi,
  SiRedis,
  SiLinux,
  SiGithubactions,
  SiPrisma,
  SiStripe,
  SiJsonwebtokens,
  SiFramer,
  SiSocketdotio,
  SiVercel,
  SiCssmodules,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbSql, TbChartInfographic } from "react-icons/tb";
import { RiProgress8Line } from "react-icons/ri";

type TechIconProps = {
  name: string;
  className?: string;
};

// Mapeo exhaustivo de tecnologías a componentes de react-icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Lenguajes
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  PHP: SiPhp,
  SQL: TbSql,
  Python: SiPython,
  HTML5: SiHtml5,
  CSS3: SiCss,

  // Frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  Tailwind: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  Vue: SiVuedotjs,
  "Vue.js": SiVuedotjs,
  "Framer Motion": SiFramer,
  "CSS Modules": SiCssmodules,
  Recharts: TbChartInfographic,

  // Backend
  "Node.js": SiNodedotjs,
  NodeJS: SiNodedotjs,
  NestJS: SiNestjs,
  Laravel: SiLaravel,
  Springboot: SiSpringboot,
  "Spring Boot": SiSpringboot,
  Express: SiExpress,
  FastAPI: SiFastapi,
  "Socket.io": SiSocketdotio,

  // Bases de datos
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Prisma: SiPrisma,

  // DevOps & Herramientas
  Git: SiGit,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  GitHub: SiGithub,
  "GitHub Actions": SiGithubactions,
  Linux: SiLinux,
  Vercel: SiVercel,
  Stripe: SiStripe,
  JWT: SiJsonwebtokens,
  Scrum: RiProgress8Line,
};

// Fallback geométrico con inicial si no se encuentra la tecnología
function GeometricFallback({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="currentColor"
        stroke="none"
      >
        {letter}
      </text>
    </svg>
  );
}

export default function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
  const IconComponent = iconMap[name];

  return (
    <span className={`inline-flex items-center justify-center ${className}`} title={name}>
      {IconComponent ? (
        <IconComponent className="w-full h-full text-current" />
      ) : (
        <GeometricFallback name={name} />
      )}
    </span>
  );
}
