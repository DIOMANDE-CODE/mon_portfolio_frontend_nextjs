"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Contact() {
  // Interface pour les catégories
  interface Categorie_Projet {
    id: number;
    nom_categorie: string;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Charger les catégories depuis l’API avec fetch
  const [services, setServices] = useState<Categorie_Projet[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setFetchLoading(true);
      try {
        const res = await fetch(`${API_URL}projet/categorie/list/`);
        if (!res.ok) throw new Error(`Erreur API (${res.status})`);
        const data = await res.json();
        setServices(data);
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };
    loadCategories();
  }, [API_URL]);

  // States pour le formulaire
  const [nom_client, setNom] = useState("");
  const [email_client, setEmail] = useState("");
  const [numero_client, setNumero] = useState("");
  const [service_client, setService] = useState(0);
  const [message_client, setMessage] = useState("");

  // Gestion mutation avec fetch
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}contact/create/`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_client,
          email_client,
          numero_client,
          service_client,
          message_client,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`Erreur API (${res.status}) : ${JSON.stringify(errData)}`);
      }

      await res.json();
      setSuccess(true);

      // Reset du formulaire
      setNom("");
      setEmail("");
      setNumero("");
      setService(0);
      setMessage("");
    } catch (err: any) {
      console.error("Erreur lors de l'envoi du formulaire:", err);
      setFormError("Impossible d'envoyer le formulaire. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <li className="breadcrumb-item active current">Me joindre</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>Discutons de votre projet.</h1>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          {/* Infos */}
          <div className="row gy-4 mb-5">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="info-card">
                <div className="icon-box">
                  <i className="bi bi-geo-alt" />
                </div>
                <h3>Adresse</h3>
                <p>Côte d'Ivoire : Abidjan, Yamoussoukro</p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="info-card">
                <div className="icon-box">
                  <i className="bi bi-telephone" />
                </div>
                <h3>Me joindre aux :</h3>
                <p>
                  Téléphone: +225 07 11 39 95 67
                  <br />
                  WhatsApp: +225 05 95 03 16 94
                  <br />
                  Email: chezpyth@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="form-wrapper" data-aos="fade-up" data-aos-delay={400}>
                <form onSubmit={handleSubmit}>
                  <b>
                    <p style={{ color: "red" }}>
                      *Tous les champs sont obligatoires
                    </p>
                  </b>

                  <div className="row">
                    <div className="col-md-6 form-group">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom & Prenoms"
                          value={nom_client}
                          onChange={(e) => setNom(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 form-group">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Adresse Email"
                          value={email_client}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6 form-group">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-phone" />
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Numéro WhatsApp"
                          value={numero_client}
                          onChange={(e) => setNumero(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 form-group">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-list" />
                        </span>
                        <select
                          className="form-control"
                          required
                          value={service_client}
                          onChange={(e) => setService(Number(e.target.value))}
                        >
                          <option value={0} disabled>
                            -- Sélectionnez un service --
                          </option>
                          {services.map((serv) => (
                            <option value={serv.id} key={serv.id}>
                              {serv.nom_categorie}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-chat-dots" />
                        </span>
                        <textarea
                          className="form-control"
                          rows={6}
                          placeholder="Écrire un message..."
                          required
                          value={message_client}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="my-3">
                      {success && (
                        <div className="alert alert-success mt-3">
                          Merci pour votre confiance. Nous vous contacterons bientôt.
                        </div>
                      )}
                      {formError && (
                        <div className="alert alert-danger mt-3">{formError}</div>
                      )}
                      {fetchError && (
                        <div className="alert alert-danger mt-3">
                          Erreur de chargement des services : {String(fetchError)}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <button type="submit" disabled={loading}>
                        Envoyer
                      </button>
                      {(loading || fetchLoading) && <div id="preloader"></div>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
}
