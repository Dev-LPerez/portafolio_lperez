import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos destacados de software y aplicaciones web desarrollados por Luis Guillermo Pérez Rubio. Plataformas en Laravel, Vue 3, React, Next.js, Firebase y PostgreSQL.",
  keywords: [
    "Proyectos Luis Guillermo Pérez Rubio",
    "Portafolio de software",
    "Sistema de Gestión de Refugios",
    "NexLocal",
    "GomiFire Menú Digital POS",
    "Aplicaciones web Laravel PostgreSQL",
    "Desarrollo frontend React Vue TypeScript",
    "Casos de estudio desarrollo full-stack",
  ],
  alternates: {
    canonical: "/proyectos",
  },
  openGraph: {
    title: "Proyectos — Luis Guillermo Pérez Rubio",
    description:
      "Explora las aplicaciones web, arquitecturas backend y proyectos desarrollados por Luis Guillermo Pérez Rubio.",
    url: "https://www.lgperez.dev/proyectos",
  },
};

export default function ProyectosPage() {
  return (
    <>
      {/* ── CABECERA ─────────────────────────────────── */}
      <section className="section-header rule-bottom">
        <div className="container">
          <p className="eyebrow">Trabajo seleccionado</p>
          <h1 className="display section-title">Proyectos</h1>
          <p className="section-sub">
            Una selección de proyectos que he construido, desde herramientas internas
            hasta plataformas públicas.
          </p>
        </div>
      </section>

      {/* ── LISTA NUMERADA ──────────────────────────── */}
      <section aria-label="Lista de proyectos">
        <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
          <ol className="projects-list">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="project-row"
                  aria-label={`Ver proyecto: ${project.title}`}
                >
                  {/* Número */}
                  <span className="project-row-num display" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Contenido */}
                  <div className="project-row-main">
                    <p className="project-row-title">{project.title}</p>
                    <div className="project-row-meta">
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>
                    <p className="project-row-summary">{project.summary}</p>
                  </div>

                  {/* Arrow */}
                  <span className="project-row-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
