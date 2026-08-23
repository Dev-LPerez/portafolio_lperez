import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lgperez.dev";

  // Páginas estáticas principales con fechas de versión estables
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre-mi`,
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date("2026-02-15"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Rutas dinámicas para cada proyecto con fecha real de actualización
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/proyectos/${project.slug}`,
    lastModified: project.updatedAt
      ? new Date(project.updatedAt)
      : new Date(project.year, 0, 1),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
