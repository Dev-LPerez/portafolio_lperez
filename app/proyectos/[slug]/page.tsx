import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getRelatedProjects, projects } from "@/lib/projects";
import ProjectCarousel from "@/components/ProjectCarousel";

// Pre-generate all slugs at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/proyectos/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    keywords: [
      project.title,
      `${project.title} Luis Guillermo Pérez Rubio`,
      `${project.title} proyecto software`,
      project.category,
      ...project.tags,
      `Desarrollo ${project.category} Colombia`,
    ],
    alternates: {
      canonical: `/proyectos/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Luis Guillermo Pérez Rubio`,
      description: project.summary,
      url: `https://www.lgperez.dev/proyectos/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Luis Guillermo Pérez Rubio`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/proyectos/[slug]">
) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(slug, 2);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.lgperez.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Proyectos",
        item: "https://www.lgperez.dev/proyectos",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://www.lgperez.dev/proyectos/${project.slug}`,
      },
    ],
  };

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    headline: project.title,
    description: project.description,
    programmingLanguage: project.tags,
    author: {
      "@type": "Person",
      name: "Luis Guillermo Pérez Rubio",
      url: "https://www.lgperez.dev",
    },
    url: `https://www.lgperez.dev/proyectos/${project.slug}`,
    ...(project.githubUrl || project.githubFrontendUrl || project.githubBackendUrl
      ? {
          codeRepository:
            project.githubUrl ||
            project.githubFrontendUrl ||
            project.githubBackendUrl,
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, projectJsonLd]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      {/* ── CABECERA ─────────────────────────────────── */}
      <section className="project-detail-header">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/proyectos">Proyectos</Link>
            <span aria-hidden="true">›</span>
            <span>{project.title}</span>
          </nav>

          {/* Categoría · Año */}
          <div className="project-detail-meta">
            <span className="eyebrow">{project.category}</span>
            <span className="eyebrow">— {project.year}</span>
          </div>

          {/* Título */}
          <h1 className="display project-detail-title">{project.title}</h1>
        </div>
      </section>

      {/* ── CUERPO ──────────────────────────────────── */}
      <section>
        <div className="container project-detail-body">
          {/* Contenido principal */}
          <div className="project-main-content">
            <p className="project-summary">{project.summary}</p>
            <p className="project-description">{project.description}</p>

            {/* Botones de acción principales */}
            {(project.liveUrl || project.githubUrl || project.githubFrontendUrl || project.githubBackendUrl) && (
              <div className="project-cta-row">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--solid"
                    id="project-live-btn"
                  >
                    Visitar sitio web ↗
                  </a>
                )}
                {project.githubFrontendUrl && (
                  <a
                    href={project.githubFrontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    id="project-github-frontend-btn"
                  >
                    GitHub (Frontend) ↗
                  </a>
                )}
                {project.githubBackendUrl && (
                  <a
                    href={project.githubBackendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    id="project-github-backend-btn"
                  >
                    GitHub (Backend) ↗
                  </a>
                )}
                {project.githubUrl && !project.githubFrontendUrl && !project.githubBackendUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    id="project-github-btn"
                  >
                    Ver código en GitHub ↗
                  </a>
                )}
              </div>
            )}

            {/* ── GALERÍA DE CAPTURAS DE PANTALLA (CARRUSEL) ──────── */}
            <div className="project-screenshots-section">
              <h2 className="display project-screenshots-title">Capturas de pantalla</h2>
              <ProjectCarousel
                title={project.title}
                liveUrl={project.liveUrl}
                screenshots={project.screenshots || []}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="project-sidebar">
            {/* Rol */}
            <div>
              <p className="project-sidebar-section-title">Rol</p>
              <p style={{ fontSize: "0.9375rem" }}>Desarrollador principal</p>
            </div>

            {/* Tecnologías */}
            <div>
              <p className="project-sidebar-section-title">Tecnologías</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Enlaces */}
            {(project.liveUrl || project.githubUrl || project.githubFrontendUrl || project.githubBackendUrl || project.links.length > 0) && (
              <div>
                <p className="project-sidebar-section-title">Enlaces</p>
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Página web en vivo ↗
                    </a>
                  )}
                  {project.githubFrontendUrl && (
                    <a
                      href={project.githubFrontendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub (Frontend) ↗
                    </a>
                  )}
                  {project.githubBackendUrl && (
                    <a
                      href={project.githubBackendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub (Backend) ↗
                    </a>
                  )}
                  {project.githubUrl && !project.githubFrontendUrl && !project.githubBackendUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Repositorio en GitHub ↗
                    </a>
                  )}
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── MÁS PROYECTOS ───────────────────────────── */}
      {related.length > 0 && (
        <section className="related-section">
          <div className="container">
            <h2 className="display related-title">Más proyectos</h2>
            <div className="related-grid">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/proyectos/${rel.slug}`}
                  className="project-card"
                  style={{ textDecoration: "none" }}
                >
                  <div className="project-card-meta">
                    <span className="project-card-year">{rel.year}</span>
                    <span className="project-card-category">— {rel.category}</span>
                  </div>
                  <h3 className="project-card-title">{rel.title}</h3>
                  <p className="project-card-summary">{rel.summary}</p>
                  <div className="project-card-tags">
                    {rel.tags.slice(0, 3).map((tag) => (
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
      )}
    </>
  );
}
