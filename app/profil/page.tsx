import Link from "next/link";
import AuthorInfo from "./authorInfo";
import AuthorContent from "./authorContent";

export default function ProfilPage() {
  return (
    <main className="main">
      <div className="page-title">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" /> Accueil</Link>
              </li>
              <li className="breadcrumb-item active">Mon profil</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Section héro : photo + bio + contact ── */}
      <section className="profil-hero-section">
        <div className="container">
          <AuthorInfo />
        </div>
      </section>

      {/* ── Grande carte skills / biographie ── */}
      <section className="profil-card-section">
        <div className="container">
          <AuthorContent />
        </div>
      </section>
    </main>
  );
}
