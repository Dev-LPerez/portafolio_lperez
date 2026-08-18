"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header-sticky">
      <div className="container header-inner">
        {/* Logo */}
        <Link href="/" className="logo">
          {profile.logo}
        </Link>

        {/* Nav centrada – se oculta en móvil */}
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

        {/* CTA Contacto */}
        <a
          href={`mailto:${profile.email}`}
          className="btn btn--solid btn--sm"
          id="header-contact-cta"
        >
          Contacto
        </a>
      </div>
    </header>
  );
}
