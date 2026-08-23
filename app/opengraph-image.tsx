import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = "Luis Guillermo Pérez Rubio — Ingeniero de Sistemas & Desarrollador de Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0d0d",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.07) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            opacity: 0.8,
          }}
        />

        {/* Header row: Brand & Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#ffffff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "20px",
                letterSpacing: "-0.5px",
              }}
            >
              LG
            </div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              www.lgperez.dev
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              padding: "6px 14px",
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#86efac",
                letterSpacing: "0.2px",
              }}
            >
              Disponible para proyectos
            </span>
          </div>
        </div>

        {/* Center: Hero Name & Role */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Luis Guillermo
            <br />
            Pérez Rubio
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#a3a3a3",
              margin: 0,
              fontWeight: 500,
            }}
          >
            {profile.role}
          </p>
        </div>

        {/* Footer: Tech Stack Pills & Location */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Laravel", "Docker"].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    padding: "6px 14px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#f5f5f5",
                    borderRadius: "4px",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>

          <span
            style={{
              fontSize: "16px",
              color: "#737373",
              fontWeight: 500,
            }}
          >
            Montería, Colombia
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
