import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

export const metadata: Metadata = {
  title: "Mes Créations Visuelles — Infographie & Montage Vidéo",
  description:
    "Galerie des créations visuelles de Diomande Droh Martial : identités visuelles, affiches, flyers, montages vidéo, motion design et design graphique professionnel.",
  keywords: [
    "infographie", "montage vidéo", "design graphique", "créations visuelles",
    "identité visuelle", "portfolio design", "Diomande Droh Martial visuels",
  ],
  alternates: { canonical: `${SITE_URL}/visuel` },
  openGraph: {
    url: `${SITE_URL}/visuel`,
    title: "Créations Visuelles — Diomande Droh Martial",
    description:
      "Galerie d'infographie et de montage vidéo de Diomande Droh Martial.",
    type: "website",
  },
};

export default function VisuelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
