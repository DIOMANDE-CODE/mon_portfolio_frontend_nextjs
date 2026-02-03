import Image from "next/image";

import { use } from "react";
import { notFound } from "next/navigation";

import Link from "next/link";

async function getProjet(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}projet/detail/${id}`);
  if (!res.ok) notFound();
  else {
    return res.json();
  }
}

export default function DetailProjet(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params); // ✅ On "unwrap" la promesse

  const detail = use(getProjet(id)); // On récupère les données avec fetch

  type Tech = {
    id: number;
    nom_technologie: string
  }

  const categories = [detail.categorie_projet];
  const proprietaires = [detail.proprietaire];
  const technologies = detail.technologie;
  console.log(technologies);

  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div className="page-title">
          <div className="breadcrumbs">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="bi bi-house" /> Acceuil
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/projet">
                    <i /> Mes travaux
                  </Link>
                </li>
                <li className="breadcrumb-item active current">Detail</li>
              </ol>
            </nav>
          </div>
          <div className="title-wrapper">
            <h1>Détail du projet</h1>
          </div>
        </div>
        {/* End Page Title */}
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              {/* Blog Details Section */}
              <section id="blog-details" className="blog-details section">
                <div className="container" data-aos="fade-up">
                  <article className="article">
                    <div className="hero-img" data-aos="zoom-in">
                      <Image
                        width={5000}
                        height={5000}
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${detail.image_projet}`}
                        alt={detail.titre_projet}
                        className="img-fluid"
                        loading="lazy"
                      />

                      <div className="meta-overlay">
                        {categories.map((cat) => (
                          <div className="meta-categories" key={cat.id}>
                            <a href={detail.lien_drive} target="_blank" className="category">
                              {"Voir le contenu"}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="article-content"
                      data-aos="fade-up"
                      data-aos-delay={100}
                    >
                      <div className="content-header">
                        <h1 className="title">{detail.titre_projet}</h1>
                        <div className="author-info">
                          {proprietaires.map((proprio) => (
                            <div className="author-details" key="auteur">
                              <Image
                                width={5000}
                                height={5000}
                                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${proprio.photo_profil}`}
                                alt="Author"
                                className="author-img"
                              />
                              <div className="info">
                                <h4>{proprio.nom}</h4>
                                <span className="role">
                                  {proprio.fonctions}
                                </span>
                              </div>
                            </div>
                          ))}

                          <div className="post-meta">
                            <span className="date">
                              <i className="bi bi-calendar3" />{" "}
                              {new Date(detail.date_creation).toLocaleString(
                                "fr-fr"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        {
                          detail.description_projet.split('\n')
                            .map((paragraph: string, index: number) => (
                              paragraph.trim() && <p key={index}>{paragraph}</p>
                            ))
                        }
                      </div>
                      <div className="meta-bottom">
                        <div className="tags-section">
                          <h4>Technologies / logiciels utilisés :</h4>
                          <div className="tags">
                            {technologies.map((tech: Tech) => (
                              <span className="tag" key={tech.id}>
                                {tech.nom_technologie}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="share-section">
                          <h4>Ressources :</h4>
                          <div className="social-links">
                            {detail.lien_facebook && (
                              <Link
                                href={detail.lien_facebook}
                                className="facebook"
                                target="_blank"
                                title="Lien Facebook du projet"
                              >
                                <i className="bi bi-facebook" />
                              </Link>
                            )}

                            {detail.lien_instagram && (
                              <Link
                                href={detail.li}
                                target="_blank"
                                className="instagram"
                                title="Lien Instagram du projet"
                              >
                                <i className="bi bi-instagram" />
                              </Link>
                            )}

                            {detail.lien_github && (
                              <a
                                href={detail.lien_github}
                                target="_blank"
                                className="github"
                                title="Lien Github du projet"
                              >
                                <i className="bi bi-github" />
                              </a>
                            )}

                            {detail.lien_drive && (
                              <a
                                href={detail.lien_drive}
                                target="_blank"
                                className="folder"
                                title="Lien Drive du projet"
                              >
                                <i className="bi bi-folder" />
                              </a>
                            )}

                            {detail.lien_projet && (
                              <a
                                href={detail.lien_projet}
                                target="_blank"
                                className="link"
                                title="Lien du projet"
                              >
                                <i className="bi bi-link" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              {/* /Blog Details Section */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
