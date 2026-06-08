"use client";

/* ──────────────────────────────────────────────────────────────
   Section Expériences — professionnelles & extra-professionnelles
   Modifie les tableaux PRO_EXPERIENCES et EXTRA_EXPERIENCES
   pour mettre à jour tes données.

   Format des dates :
     dateDebut / dateFin : "AAAA-MM"  ex. "2023-06"
                         | "AAAA"     ex. "2024"
                         | "présent"  (pour dateFin en cours)
     Si dateFin est absent → affiche uniquement dateDebut (date de création).
   ────────────────────────────────────────────────────────────── */

const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function formatDate(date: string): string {
  if (date.toLowerCase() === "présent") return "Présent";
  // Format AAAA-MM
  if (/^\d{4}-\d{2}$/.test(date)) {
    const [annee, mois] = date.split("-");
    return `${MOIS_FR[parseInt(mois, 10) - 1]} ${annee}`;
  }
  // Format AAAA seul
  return date;
}

function formatPeriode(dateDebut: string, dateFin?: string): string {
  const debut = formatDate(dateDebut);
  if (!dateFin) return debut;
  const fin = formatDate(dateFin);
  if (fin === debut) return debut;
  return `${debut} — ${fin}`;
}

interface Experience {
  dateDebut: string;
  dateFin?: string;
  title: string;
  organization: string;
  description: string;
  icon: string;
  tags?: string[];
}

const PRO_EXPERIENCES: Experience[] = [
  {
    dateDebut: "2026-03",
    dateFin: "Aujourd'hui",
    title: "Developpeur Frontend (Freelance)",
    organization: "CELESTE DEVS&CO",
    description:
      "Au cours de cette expérience, je suis chargé de la transformation de maquettes graphiques en interfaces web modernes, fluides et entièrement responsive (adaptées à tous les types d'écrans). Mon travail également consiste à dynamiser ces interfaces en assurant l'intégration et la consommation des différentes API REST fournies par l'équipe Backend, garantissant ainsi une synchronisation parfaite des données en temps réel et une expérience utilisateur optimale.",
    icon: "bi-code-slash",
    tags: ["NextJS", "Postman", "Github"],
  },
  {
    dateDebut: "2023-11",
    dateFin: "2025-03",
    title: "Infographe",
    organization: "OGA+ Imprimerie & Services",
    description:
      "Travail sur plusieurs projets d'infographie (flyer, bâche, affiche, kakemono, plaquette, etc.) au sein de cette imprimerie. Conception et réalisation de visuels à imprimer.",
    icon: "bi-printer",
    tags: ["Infographie", "Photoshop", "Illustrator", "Impression"],
  },
  {
    dateDebut: "2023-04",
    dateFin: "2023-05",
    title: "Assistant Communication (Freelance)",
    organization: "Rev'Event",
    description:
      "Mon rôle, au cours de cette expérience, était de soutenir le comité d'organisation dans la conception des visuels et l'organisation de leurs activités Meet'Up 2022, le rendez-vous des créatifs.",
    icon: "bi-megaphone",
    tags: ["Communication digitale", "photoshop"],
  },
  {
    dateDebut: "2022-11",
    dateFin: "2022-12",
    title: "Assistant Communication (Freelance)",
    organization: "Rev'Event",
    description:
      "Mon apport à cette activité était dans la conception des visuels et l'organisation de l'activité Meet'Up 2022, autour du thème : Mieux se connaitre pour réussir dans les affaires.",
    icon: "bi-megaphone",
    tags: ["Communication digitale", "photoshop"],
  },
  {
    dateDebut: "2021-03",
    dateFin: "2021-11",
    title: "Stage — Développeur Front-End",
    organization: "LOCOMOTIVE SARL",
    description:
      "Conception et réalisation d'une application desktop de gestion du parcours des patients d'une clinique.",
    icon: "bi-code-slash",
    tags: ["Vue JS", "Electron JS", "Bootstrap"],
  },
];

const EXTRA_EXPERIENCES: Experience[] = [
  {
    dateDebut: "2023-08",
    dateFin: "2024-01",
    title: "Graphic Designer — Communication Interne",
    organization: "AIESEC en Côte d'Ivoire",
    description:
      "Travail sur l'ensemble de la communication interne de AIESEC CI dans l'optique de motiver, enseigner et développer les membres.",
    icon: "bi-palette",
    tags: ["Communication", "Infographie", "Photoshop"],
  },
  {
    dateDebut: "2023-02",
    dateFin: "2024-01",
    title: "Vice-Président B2C — Marketing & Communication",
    organization: "AIESEC in Abidjan Nord",
    description:
      "En tant que responsable du département Business To Customer, gestion de l'aspect marketing et communication de l'entité locale Abidjan Nord.",
    icon: "bi-person-badge",
    tags: ["Marketing", "Communication", "Management"],
  },
  {
    dateDebut: "2023-02",
    dateFin: "2023-06",
    title: "Digital Project Manager",
    organization: "AIESEC in Sénégal",
    description:
      "Avec l'équipe du bureau national du Sénégal, développement de projets pour la jeunesse sénégalaise (stages internationaux, Formation Académie).",
    icon: "bi-diagram-3",
    tags: ["Gestion de projet", "Marketing Digital"],
  },
  {
    dateDebut: "2023-03",
    dateFin: "2023-05",
    title: "Assistant Montage Vidéo",
    organization: "AIESEC in Bulgarie",
    description:
      "Première expérience en Europe : assistance à la responsable nationale dans la communication à travers des montages vidéos.",
    icon: "bi-camera-video",
    tags: ["Montage Vidéo", "Communication"],
  },
  {
    dateDebut: "2022-07",
    dateFin: "2023-01",
    title: "Assistant Communication",
    organization: "AAMEA — AIESEC Alumni Middle East of Africa",
    description:
      "Avec le bureau des anciens membres de la zone Afrique de l'Ouest, animation des pages réseaux sociaux de la structure régionale.",
    icon: "bi-megaphone",
    tags: ["Réseaux sociaux", "Communication digitale"],
  },
  {
    dateDebut: "2022-07",
    dateFin: "2022-11",
    title: "Responsable Communication — NYLS 2022",
    organization: "AIESEC in Côte d'Ivoire",
    description:
      "Pour le séminaire national NYLS à Divo, gestion de l'aspect marketing et communication de l'événement pour les jeunes.",
    icon: "bi-broadcast",
    tags: ["Événementiel", "Photoshop", "Communication"],
  },
  {
    dateDebut: "2021-12",
    dateFin: "2022-01",
    title: "Responsable Communication — DINER GALA ABIDJAN SUD",
    organization: "AIESEC in Côte d'Ivoire",
    description:
      "Pour la soirée diner gala du commité local de AIESEC Côte d'Ivoire, entité Abidjan Sud.",
    icon: "bi-broadcast",
    tags: ["Événementiel", "Photoshop", "Communication"],
  },
];

/* ── Récompenses ── */
interface Recompense {
  dateDebut: string;
  dateFin?: string;
  title: string;
  organizer: string;
  description: string;
  result?: string;
  tags?: string[];
}

const RECOMPENSES: Recompense[] = [
  {
    dateDebut: "2022",
    title: "TECHNOVORE HACKATHON ESATIC — Session 2022",
    organizer: "ESATIC",
    result: "1er Prix",
    description:
      "Participation en tant que coach lors du hackathon TECHNOVORE organisé par l'ESATIC. L'équipe encadrée a décroché le premier prix de la compétition.",
    tags: ["Hackathon", "Coach", "Innovation", "Tech"],
  },
  {
    dateDebut: "2022",
    title: "SEMINAIRE NATIONAL NYLS DIVO 2022",
    organizer: "AIESEC CÔTE D'IVOIRE",
    result: "Meilleur membre du comité d'organisation",
    description:
      "Participation en tant que responsable marketing et communication durant l'organisation du séminaire.",
    tags: ["Leadership", "Travail"],
  },
  /* Ajoute d'autres récompenses ici */
];

/* ── Contributions GitHub ── */
interface GithubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars?: number;
  forks?: number;
}

const GITHUB_REPOS: GithubRepo[] = [
  {
    name: "Ya Bon Prix",
    description: "Developpement d'une boutique SAAS pour les commerçants et vendeurs d'articles en ligne.",
    url: "#",
    language: "Django, NextJS, Docker, CI/CD",
    languageColor: "#3178c6",
  },
  {
    name: "Kôkô Ticket",
    description: "Dévéloppement d'une application de commande de ticket évènementiel en ligne (Ex: Concert, Seminaire, Conférence, etc...).",
    url: "#",
    language: "Django, NextJS, Docker, CI/CD, FastAPI",
    languageColor: "#3178c6",
  },
  /* Ajoute d'autres repos ici */
];

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  return (
    <div
      className="exp-timeline-item"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="exp-timeline-dot">
        <i className={`bi ${exp.icon}`} />
      </div>
      <div className="exp-timeline-body">
        <span className="exp-period">
          {formatPeriode(exp.dateDebut, exp.dateFin)}
        </span>
        <h4 className="exp-title">{exp.title}</h4>
        <p className="exp-org">
          <i className="bi bi-buildings" />
          {exp.organization}
        </p>
        <p className="exp-desc">{exp.description}</p>
        {exp.tags && exp.tags.length > 0 && (
          <div className="exp-tags">
            {exp.tags.map((tag, ti) => (
              <span className="exp-tag" key={ti}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RecompenseItem({ item, index }: { item: Recompense; index: number }) {
  return (
    <div
      className="exp-timeline-item"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="exp-timeline-dot exp-timeline-dot--contest">
        <i className="bi bi-trophy" />
      </div>
      <div className="exp-timeline-body">
        <span className="exp-period exp-period--contest">
          {formatPeriode(item.dateDebut, item.dateFin)}
        </span>
        <h4 className="exp-title">{item.title}</h4>
        <p className="exp-org">
          <i className="bi bi-buildings" />
          {item.organizer}
        </p>
        {item.result && (
          <span className="exp-result">
            <i className="bi bi-award-fill" />
            {item.result}
          </span>
        )}
        <p className="exp-desc">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="exp-tags">
            {item.tags.map((tag, ti) => (
              <span className="exp-tag" key={ti}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function GithubCard({ repo, index }: { repo: GithubRepo; index: number }) {
  return (
    <div
      className="exp-github-card"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      <div className="exp-github-card-top">
        <i className="bi bi-github exp-github-icon" />
        <span className="exp-github-name">{repo.name}</span>
      </div>
      <p className="exp-github-desc">{repo.description}</p>
      <div className="exp-github-meta">
        <span className="exp-github-lang">
          <span
            className="exp-github-lang-dot"
            style={{ background: repo.languageColor }}
          />
          {repo.language}
        </span>
        {repo.stars !== undefined && (
          <span className="exp-github-stat">
            <i className="bi bi-star" /> {repo.stars}
          </span>
        )}
        {repo.forks !== undefined && (
          <span className="exp-github-stat">
            <i className="bi bi-diagram-2" /> {repo.forks}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AuthorExperiences() {
  return (
    <section className="exp-section" data-aos="fade-up">
      <div className="section-title">
        <p>Parcours</p>
        <h2>Mes expériences</h2>
      </div>

      {/* ── Ligne 1 : Récompenses + Contributions GitHub ── */}
      <div className="exp-layout">

        {/* Récompenses */}
        <div className="exp-col">
          <div className="exp-col-header">
            <div className="exp-col-icon exp-col-icon--contest">
              <i className="bi bi-award-fill" />
            </div>
            <div>
              <h3 className="exp-col-title">Récompenses &amp; Distinctions</h3>
              <p className="exp-col-sub">Prix, certifications &amp; reconnaissances</p>
            </div>
          </div>

          {RECOMPENSES.length === 0 ? (
            <div className="exp-empty">
              <i className="bi bi-award" />
              <p>Prochainement — des récompenses à venir !</p>
            </div>
          ) : (
            <div className="exp-timeline">
              {RECOMPENSES.map((item, i) => (
                <RecompenseItem item={item} index={i} key={i} />
              ))}
            </div>
          )}
        </div>

        {/* Contributions GitHub */}
        <div className="exp-col">
          <div className="exp-col-header">
            <div className="exp-col-icon exp-col-icon--github">
              <i className="bi bi-github" />
            </div>
            <div>
              <h3 className="exp-col-title">Contributions GitHub</h3>
              <p className="exp-col-sub">Projets open source, en équipe &amp; personnels</p>
            </div>
          </div>

          {GITHUB_REPOS.length === 0 ? (
            <div className="exp-empty">
              <i className="bi bi-code-slash" />
              <p>Aucun repo à afficher pour le moment.</p>
            </div>
          ) : (
            <div className="exp-github-grid">
              {GITHUB_REPOS.map((repo, i) => (
                <GithubCard repo={repo} index={i} key={i} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── Ligne 2 : Professionnelles + Extra-professionnelles ── */}
      <div className="exp-layout exp-layout--bottom">

        <div className="exp-col">
          <div className="exp-col-header">
            <div className="exp-col-icon">
              <i className="bi bi-briefcase-fill" />
            </div>
            <div>
              <h3 className="exp-col-title">Professionnelles</h3>
              <p className="exp-col-sub">Expériences de travail &amp; stages</p>
            </div>
          </div>
          <div className="exp-timeline">
            {PRO_EXPERIENCES.map((exp, i) => (
              <TimelineItem exp={exp} index={i} key={i} />
            ))}
          </div>
        </div>

        <div className="exp-col">
          <div className="exp-col-header">
            <div className="exp-col-icon exp-col-icon--extra">
              <i className="bi bi-stars" />
            </div>
            <div>
              <h3 className="exp-col-title">Extra-professionnelles</h3>
              <p className="exp-col-sub">Bénévolat, projets &amp; passions</p>
            </div>
          </div>
          <div className="exp-timeline">
            {EXTRA_EXPERIENCES.map((exp, i) => (
              <TimelineItem exp={exp} index={i} key={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
