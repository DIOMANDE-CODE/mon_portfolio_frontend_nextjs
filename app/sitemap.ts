import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ── Pages statiques ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projet`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/profil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/visuel`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  /* ── Pages dynamiques : projets ── */
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}projet/list/`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const projects: { id: number; date_creation?: string }[] = Array.isArray(data)
        ? data
        : (data.results ?? []);

      projectRoutes = projects.map((p) => ({
        url: `${BASE_URL}/projet/${p.id}`,
        lastModified: p.date_creation ? new Date(p.date_creation) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch {
    /* Sitemap partiel si l'API est indisponible — sans bloquer le build */
  }

  return [...staticRoutes, ...projectRoutes];
}
