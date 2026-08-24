import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/lib/profile";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lgperez.dev"),
  title: {
    default: "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software",
    template: "%s | Luis Guillermo Pérez Rubio",
  },
  description:
    "Portafolio profesional de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador Full-Stack (Backend Focus) en Montería, Colombia. Especializado en TypeScript, Next.js, NestJS, Laravel, Spring Boot y PostgreSQL.",
  keywords: [
    // Identidad y Marca Personal
    "Luis Guillermo Pérez Rubio",
    "Luis Guillermo Perez Rubio",
    "Luis Pérez Rubio",
    "Luis Perez Rubio",
    "Luis Guillermo Pérez",
    "Luis Guillermo Perez",
    "luisgperezrubio",
    "Dev-LPerez",
    // Roles Profesionales
    "Ingeniero de Sistemas",
    "Desarrollador de Software",
    "Desarrollador Full-Stack",
    "Desarrollador Backend",
    "Backend Developer",
    "Full-Stack Developer",
    "Programador Web",
    // Tecnologías y Frameworks
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "Next.js",
    "React",
    "Vue.js",
    "PHP",
    "Laravel",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "MySQL",
    "Firebase",
    "Docker",
    "Tailwind CSS",
    // Especialidades Técnicas
    "Arquitectura Modular",
    "APIs RESTful",
    "Microservicios",
    "Modelado de Bases de Datos",
    "Progressive Web Apps",
    "PWA",
    // SEO Local y Regional (Córdoba, Colombia)
    "Desarrollador de Software Montería",
    "Ingeniero de Sistemas Montería",
    "Desarrollador de Software Cereté",
    "Programador Cereté Córdoba",
    "Desarrollador de Software Sahagún",
    "Programador Sahagún Córdoba",
    "Desarrollador Web Lorica Córdoba",
    "Desarrollador Web Montelíbano",
    "Desarrollador Web Planeta Rica",
    "Desarrollador Web Ciénaga de Oro",
    "Desarrollador Web San Pelayo Córdoba",
    "Desarrollador Web Córdoba Colombia",
    "Desarrollador Backend Colombia",
    "Programador en Montería",
    "Desarrollador Freelance Córdoba",
    "Desarrollador Freelance Colombia",
    "Universidad de Córdoba Ingeniería de Sistemas",
  ],
  authors: [{ name: "Luis Guillermo Pérez Rubio", url: "https://www.lgperez.dev" }],
  creator: "Luis Guillermo Pérez Rubio",
  publisher: "Luis Guillermo Pérez Rubio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.lgperez.dev",
    siteName: "Luis Guillermo Pérez Rubio — Portafolio",
    title: "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software",
    description:
      "Portafolio profesional de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador Full-Stack (Backend Focus) en Montería, Cereté, Sahagún y todo el departamento de Córdoba, Colombia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software",
    description:
      "Portafolio profesional de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador Full-Stack desde Córdoba, Colombia.",
    creator: "@luisgperezrubio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.lgperez.dev/#person",
      name: profile.name,
      givenName: "Luis Guillermo",
      familyName: "Pérez Rubio",
      jobTitle: [
        "Ingeniero de Sistemas",
        "Desarrollador Full-Stack",
        "Backend Developer",
      ],
      url: "https://www.lgperez.dev",
      image: "https://www.lgperez.dev/luisperez.jpg",
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montería",
        addressRegion: "Córdoba",
        addressCountry: "CO",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Departamento de Córdoba, Colombia" },
        { "@type": "City", name: "Montería" },
        { "@type": "City", name: "Cereté" },
        { "@type": "City", name: "Sahagún" },
        { "@type": "City", name: "Lorica" },
        { "@type": "City", name: "Montelíbano" },
        { "@type": "City", name: "Planeta Rica" },
        { "@type": "City", name: "Ciénaga de Oro" },
        { "@type": "City", name: "San Pelayo" },
        { "@type": "Country", name: "Colombia" },
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: profile.education.institution,
      },
      sameAs: [
        profile.social.github,
        profile.social.linkedin,
        profile.social.x,
      ],
      knowsAbout: [
        "Ingeniería de Sistemas",
        "Desarrollo Full-Stack",
        "Desarrollo Backend",
        "Arquitectura de Software",
        "Modelado de Bases de Datos",
        "APIs RESTful",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "NestJS",
        "Next.js",
        "React",
        "Vue.js",
        "PHP",
        "Laravel",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "MySQL",
        "Firebase Firestore",
        "Docker",
        "Tailwind CSS",
        "Git",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.lgperez.dev/#website",
      url: "https://www.lgperez.dev",
      name: "Luis Guillermo Pérez Rubio — Portafolio",
      description:
        "Portafolio profesional de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador Full-Stack.",
      publisher: {
        "@id": "https://www.lgperez.dev/#person",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${barlow.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex-1" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
