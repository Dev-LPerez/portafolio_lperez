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
    "Portafolio de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador de Software colombiano. Especializado en React, Next.js, Node.js y PostgreSQL.",
  keywords: [
    "Luis Guillermo Pérez Rubio",
    "Luis Perez",
    "Ingeniero de Sistemas",
    "Desarrollador de Software",
    "Desarrollador Full-Stack",
    "Backend Developer",
    "TypeScript",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "Laravel",
    "Colombia",
    "Montería",
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
      "Portafolio de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador de Software colombiano. Especializado en React, Next.js, Node.js y PostgreSQL.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software",
    description:
      "Portafolio de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador de Software colombiano.",
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
      jobTitle: profile.role,
      url: "https://www.lgperez.dev",
      image: "https://www.lgperez.dev/luisperez.jpg",
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montería",
        addressRegion: "Córdoba",
        addressCountry: "CO",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: profile.education.institution,
      },
      sameAs: [
        profile.social.github,
        profile.social.linkedin,
        profile.social.x,
      ],
      knowsAbout: Object.values(profile.skills).flat(),
    },
    {
      "@type": "WebSite",
      "@id": "https://www.lgperez.dev/#website",
      url: "https://www.lgperez.dev",
      name: "Luis Guillermo Pérez Rubio — Portafolio",
      description:
        "Portafolio de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador Full-Stack.",
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
