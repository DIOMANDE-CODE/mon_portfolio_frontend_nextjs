import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

export const metadata: Metadata = {
  title: "Mes Réalisations — Projets Web, Mobile & IA",
  description:
    "Découvrez les projets web, mobile et IA réalisés par Diomande Droh Martial : applications full-stack, intégrations d'intelligence artificielle, sites e-commerce, outils de gestion et bien plus.",
  keywords: [
    "projets développeur", "projets web", "projets mobile", "projets IA",
    "réalisations développeur full-stack", "portfolio projets", "Diomande Droh Martial projets",
  ],
  alternates: { canonical: `${SITE_URL}/projet` },
  openGraph: {
    url: `${SITE_URL}/projet`,
    title: "Mes Réalisations — Diomande Droh Martial",
    description:
      "Projets web, mobile et IA réalisés par Diomande Droh Martial, développeur Full-Stack & ingénieur logiciel.",
    type: "website",
  },
};

export default function ProjetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
