import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/profile";
import { getFeaturedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software",
  description:
    "Portafolio de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador de Software colombiano especializado en React, Next.js y Node.js.",
  openGraph: {
    title: "Luis Guillermo Pérez Rubio — Portafolio",
    description:
      "Ingeniero de Sistemas & Desarrollador de Software desde Colombia. Ver proyectos y experiencia.",
  },
};

export default function HomePage() {
  const featured = getFeaturedProjects();
  const { stats } = profile;

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="hero rule-bottom">
        <div className="container">
          {/* Top row: status */}
          <div className="hero-top">
            <span className="hero-status">
              <span className="hero-status-dot" aria-hidden="true" />
              Disponible para proyectos
            </span>
          </div>

          {/* Nombre y Foto alineados proporcionalmente */}
          <div className="hero-title-row">
            <h1 className="display hero-title">
              Luis Guillermo
              <br />
              Pérez Rubio
            </h1>

            <div className="hero-photo-frame" aria-label={profile.name}>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="hero-photo-img"
                  loading="eager"
                />
              ) : (
                <span className="hero-photo-initials">{profile.initials}</span>
              )}
            </div>
          </div>

          {/* Intro */}
          <p className="hero-intro">
            Ingeniero de Sistemas y Desarrollador Full-Stack apasionado por el Backend, la arquitectura modular y la programación tipada (TypeScript, NestJS, Java). Construyo APIs robustas, monolitos bien estructurados y soluciones con bases de datos relacionales como PostgreSQL.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link href="/proyectos" className="btn btn--solid" id="hero-cta-projects">
              Ver proyectos
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="btn btn--outline"
              id="hero-cta-contact"
            >
              Trabajemos juntos
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="stats-strip rule-bottom" aria-label="Estadísticas">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <p className="stat-number display">{stats.years}+</p>
              <p className="stat-label">Años de experiencias</p>
            </div>
            <div className="stat-item">
              <p className="stat-number display">{stats.projects}+</p>
              <p className="stat-label">Proyectos construidos</p>
            </div>
            <div className="stat-item">
              <p className="stat-number display">{stats.technologies}+</p>
              <p className="stat-label">Tecnologías dominadas</p>
            </div>
            <div className="stat-item">
              <p className="stat-number display">{stats.coffees}+</p>
              <p className="stat-label">Tintos tomados</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS DESTACADOS ─────────────────────── */}
      <section className="projects-teaser rule-bottom">
        <div className="container">
          <div className="projects-teaser-header">
            <h2 className="display projects-teaser-title">Proyectos destacados</h2>
            <Link href="/proyectos" className="projects-teaser-link">
              Ver todos →
            </Link>
          </div>

          <div className="projects-grid">
            {featured.map((project) => (
              <Link
                key={project.slug}
                href={`/proyectos/${project.slug}`}
                className="project-card"
                style={{ textDecoration: "none" }}
              >
                <div className="project-card-meta">
                  <span className="project-card-year">{project.year}</span>
                  <span className="project-card-category">— {project.category}</span>
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>
                <div className="project-card-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEASER SOBRE MÍ ─────────────────────────── */}
      <section className="about-teaser">
        <div className="container about-teaser-inner">
          <p className="about-teaser-phrase">
            Ingeniero de Sistemas Y Desarrollador Full-Stack,
            <br />
            Diseñando soluciones robustas.
          </p>
          <Link href="/sobre-mi" className="about-teaser-link">
            Conocer más sobre mí →
          </Link>
        </div>
      </section>
    </>
  );
}
