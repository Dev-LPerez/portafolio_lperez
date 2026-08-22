import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

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
  title: {
    default: "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software",
    template: "%s | Luis Guillermo Pérez Rubio",
  },
  description:
    "Portafolio de Luis Guillermo Pérez Rubio, Ingeniero de Sistemas y Desarrollador de Software colombiano. Especializado en React, Next.js, Node.js y PostgreSQL.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "LGPR — Portafolio",
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://lgpr.dev"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${barlow.variable}`}
    >
      <body className="flex-1" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
