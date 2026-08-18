import type { Metadata } from "next";
import { profile } from "@/lib/profile";
import TechIcon from "@/components/TechIcon";
import CertificatesList from "@/components/CertificatesList";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce a Luis Guillermo Pérez Rubio: Ingeniero de Sistemas y Desarrollador Full-Stack colombiano. Habilidades, trayectoria y formación.",
  openGraph: {
    title: "Sobre mí — Luis Guillermo Pérez Rubio",
    description:
      "Ingeniero de Sistemas & Desarrollador Full-Stack desde Colombia. Habilidades, trayectoria y formación.",
  },
};

export default function SobreMiPage() {
  const { bio, skills, education, certificates, languages } = profile;

  return (
    <>
      {/* ── CABECERA ─────────────────────────────────── */}
      <section className="section-header rule-bottom">
        <div className="container">
          <p className="eyebrow">Sobre mí</p>
          <h1 className="display section-title">¿Quién soy?</h1>
        </div>
      </section>

      {/* ── BIO + SIDEBAR ────────────────────────────── */}
      <section className="rule-bottom">
        <div className="container about-body">
          {/* Biografía */}
          <div className="about-bio">
            {bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Datos clave */}
          <aside className="about-sidebar">
            <dl className="about-dl">
              <dt>Rol</dt>
              <dd>{profile.role}</dd>

              <dt>Estado</dt>
              <dd>
                <span
                  className={`status-dot ${profile.status === "available"
                    ? "status-dot--available"
                    : "status-dot--busy"
                    }`}
                  aria-hidden="true"
                />
                {profile.status === "available"
                  ? "Disponible para proyectos"
                  : "No disponible"}
              </dd>

              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>

              <dt>Idiomas</dt>
              {languages.map(({ lang, level }) => (
                <dd key={lang}>
                  {lang} — {level}
                </dd>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* ── HABILIDADES ─────────────────────────────── */}
      <section className="skills-section rule-bottom">
        <div className="container">
          <h2 className="display skills-section-title">Habilidades Técnicas</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="skill-group-title">{category}</p>
                <ul className="skill-list">
                  {items.map((tech) => {
                    // Extraer el nombre base para el ícono (antes del paréntesis)
                    const iconName = tech.split(" (")[0].split(" /")[0].trim();
                    return (
                      <li key={tech} className="skill-item">
                        <span className="skill-icon">
                          <TechIcon name={iconName} className="w-full h-full" />
                        </span>
                        {tech}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCACIÓN (ARRIBA) ───────────────────────── */}
      <section className="timeline-section rule-bottom">
        <div className="container">
          <h2 className="display timeline-section-title">Educación</h2>
          <div className="timeline" role="list">
            <article className="timeline-entry" role="listitem">
              <p className="timeline-year">{education.period}</p>
              <div>
                <p className="timeline-role">{education.degree}</p>
                <p className="timeline-company">{education.institution}</p>
                <p className="timeline-detail">Promedio académico: {education.gpa}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CERTIFICADOS (ABAJO) ─────────────────────── */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="display timeline-section-title">Certificados</h2>
          <CertificatesList certificates={certificates} />
        </div>
      </section>
    </>
  );
}
