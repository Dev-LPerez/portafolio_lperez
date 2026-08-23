import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/projects";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProject(slug);

  const title = project?.title || "Proyecto";
  const category = project?.category || "Desarrollo de Software";
  const year = project?.year ? String(project.year) : "2026";
  const summary = project?.summary || "Proyecto de desarrollo de software.";
  const tags = project?.tags?.slice(0, 5) || ["TypeScript", "Full-Stack"];

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
        {/* Subtle grid background */}
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

        {/* Top bar: Breadcrumb / Category and Brand */}
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
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#a3a3a3",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Proyectos
            </span>
            <span style={{ color: "#525252" }}>/</span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {category} · {year}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                color: "#d4d4d4",
              }}
            >
              www.lgperez.dev
            </span>
          </div>
        </div>

        {/* Center: Project Title and Summary */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 30 ? "52px" : "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#a3a3a3",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: "980px",
            }}
          >
            {summary}
          </p>
        </div>

        {/* Bottom bar: Tech tags and Author attribution */}
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
            {tags.map((tag) => (
              <span
                key={tag}
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
                {tag}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "16px",
              color: "#a3a3a3",
              fontWeight: 600,
            }}
          >
            Luis Guillermo Pérez Rubio
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
