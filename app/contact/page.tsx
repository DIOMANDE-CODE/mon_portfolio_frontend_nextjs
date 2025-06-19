"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import useFetch from "@/hook/useFetch";
import useMutation from "@/hook/useMutation";

export default function Contact() {
  // Charger les categories
  interface Categorie_Projet {
    id: number;
    nom_categorie: string;
  }

  const { data, error, loading } = useFetch("projet/categorie/list/");
  const [services, setServices] = useState<Categorie_Projet[]>([]);

  useEffect(() => {
    if (data) {
      setServices(data);
    }
  }, [data]);

  // Declaration des States pour le formulaire contact
  const [nom_client, setNom] = useState("");
  const [email_client, setEmail] = useState("");
  const [numero_client, setNumero] = useState("");
  const [service_client, setService] = useState(0);
  const [message_client, setMessage] = useState("");
  const { mutate, success } = useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutate("contact/create/", "POST", {
        nom_client,
        email_client,
        numero_client,
        service_client,
        message_client,
      });
      setNom("");
      setEmail("");
      setNumero("");
      setService(0);
      setMessage("");
    } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire:", error);
  }

    if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;
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
      {/* End Page Title */}
      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
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
                <h3>Nous joindre aux :</h3>
                <p>
                  Téléphone: +225 07 11 39 95 67
                  <br />
                  Email: chezpyth@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                className="form-wrapper"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <form onSubmit={handleSubmit} className="">
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
                          placeholder="Addresse Email"
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
                          type="text"
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
                          name="message"
                          rows={6}
                          placeholder="Ecrire un méssage..."
                          required
                          value={message_client}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="my-3">
                      <div className="error-message" />
                      {success && (
                        <div className="alert alert-success mt-3">
                          Merci pour votre confiance. Nous vous contacterons bientot.
                        </div>
                      )}
                      {error && (
                        <div className="alert alert-red mt-3">{error}</div>
                      )}
                    </div>
                    <div className="text-center">
                      <button type="submit" disabled={loading}>Envoyez</button>
                      {
                        loading && <div id="preloader"></div>
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Contact Section */}
    </main>
  );
}
