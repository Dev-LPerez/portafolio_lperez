"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";

const navLinks = [
  { href: "/", label: "Inicio", num: "01" },
  { href: "/sobre-mi", label: "Sobre mí", num: "02" },
  { href: "/proyectos", label: "Proyectos", num: "03" },
  { href: "/contacto", label: "Contacto", num: "04" },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.1rem", height: "1.1rem" }} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.1rem", height: "1.1rem" }} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Cerrar el menú automáticamente al cambiar de ruta
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Bloquear scroll de la página cuando el menú móvil está abierto y manejar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="header-sticky">
      <div className="container header-inner">
        {/* Logo */}
        <Link
          href="/"
          className="logo"
          onClick={() => setIsOpen(false)}
          aria-label={`${profile.name} - Inicio`}
        >
          {profile.logo}
        </Link>

        {/* Nav centrada – solo escritorio */}
        <nav className="nav-desktop" aria-label="Navegación principal">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${active ? " nav-link--active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Controles de la derecha */}
        <div className="header-actions">
          {/* CTA Contacto visible en desktop y tablets */}
          <a
            href={`mailto:${profile.email}`}
            className="btn btn--solid btn--sm header-cta-btn"
            id="header-contact-cta"
          >
            Contacto
          </a>

          {/* Botón Hamburguesa accesible para Móvil */}
          <button
            type="button"
            className={`header-burger-btn ${isOpen ? "is-active" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <span className="burger-line burger-line--top" />
            <span className="burger-line burger-line--mid" />
            <span className="burger-line burger-line--bot" />
          </button>
        </div>
      </div>

      {/* ── MENÚ / DRAWER MÓVIL ────────────────────────── */}
      <div
        id="mobile-navigation-drawer"
        className={`mobile-drawer ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        {/* Fondo con desenfoque / Backdrop */}
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Panel de navegación desplegable */}
        <div className="mobile-drawer-panel">
          <div className="container mobile-drawer-content">
            {/* Estado de disponibilidad */}
            <div className="mobile-drawer-status">
              <span className="hero-status">
                <span className="hero-status-dot" aria-hidden="true" />
                Disponible para proyectos
              </span>
            </div>

            {/* Enlaces de navegación principales */}
            <nav className="mobile-drawer-nav" aria-label="Navegación móvil">
              {navLinks.map(({ href, label, num }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-nav-item ${
                      active ? "mobile-nav-item--active" : ""
                    }`}
                  >
                    <span className="mobile-nav-num">{num}</span>
                    <span className="mobile-nav-label display">{label}</span>
                    <span className="mobile-nav-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Tarjeta de contacto rápido y redes */}
            <div className="mobile-drawer-footer">
              <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
                Contacto directo
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mobile-drawer-email"
                onClick={() => setIsOpen(false)}
              >
                {profile.email}
              </a>

              <div className="mobile-drawer-socials">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-btn"
                  aria-label="GitHub de Luis"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-btn"
                  aria-label="LinkedIn de Luis"
                >
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
