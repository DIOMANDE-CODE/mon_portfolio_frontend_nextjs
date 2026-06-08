const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Formate une date ISO en français : "15 juin 2024" ou "juin 2024" */
export function formatDateFR(dateStr: string, avecJour = false): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const mois = MOIS_FR[d.getMonth()];
  const annee = d.getFullYear();
  if (avecJour) return `${d.getDate()} ${mois} ${annee}`;
  return `${mois} ${annee}`;
}

/**
 * Formate une période en français.
 * - Si dateFin est fournie et différente de dateDebut : "juin 2023 — mars 2024"
 * - Si dateFin === dateDebut (même période) : affiche une seule date
 * - Si dateFin absente : uniquement la date de début / création
 */
export function formatPeriodeFR(
  dateDebut: string,
  dateFin?: string | null,
  avecJour = false
): string {
  const debut = formatDateFR(dateDebut, avecJour);
  if (!dateFin) return debut;
  const fin = formatDateFR(dateFin, avecJour);
  if (fin === debut) return debut;
  return `${debut} — ${fin}`;
}
