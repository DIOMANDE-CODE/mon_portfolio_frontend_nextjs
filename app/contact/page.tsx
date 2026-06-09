"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface CategorieProjet { id: number; nom_categorie: string; }

const CONTACT_INFO = [
  {
    icon: "bi-geo-alt-fill",
    title: "Localisation",
    lines: ["Côte d'Ivoire", "Abidjan · Yamoussoukro"],
  },
  {
    icon: "bi-whatsapp",
    title: "WhatsApp",
    lines: ["+225 07 11 39 95 67", "+225 05 95 03 16 94"],
    href: "https://wa.me/2250711399567",
  },
  {
    icon: "bi-envelope-fill",
    title: "Email",
    lines: ["diomandedrohmartial01@gmail.com"],
    href: "mailto:diomandedrohmartial01@gmail.com",
  },
];

export default function Contact() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const successRef = useRef<HTMLDivElement>(null);

  const [services,      setServices]      = useState<CategorieProjet[]>([]);
  const [fetchLoading,  setFetchLoading]  = useState(false);
  const [nom_client,    setNom]           = useState("");
  const [email_client,  setEmail]         = useState("");
  const [numero_client, setNumero]        = useState("");
  const [service_client,setService]       = useState(0);
  const [message_client,setMessage]       = useState("");
  const [loading,       setLoading]       = useState(false);
  const [success,       setSuccess]       = useState(false);
  const [formError,     setFormError]     = useState<string | null>(null);
  const [charCount,     setCharCount]     = useState(0);

  useEffect(() => {
    setFetchLoading(true);
    fetch(`${API_URL}projet/categorie/list/`)
      .then((r) => r.json())
      .then((d) => setServices(d))
      .catch(() => {})
      .finally(() => setFetchLoading(false));
  }, [API_URL]);

  /* Scroll vers le message de succès */
  useEffect(() => {
    if (success) successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}contact/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_client, email_client, numero_client, service_client, message_client }),
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      await res.json();
      setSuccess(true);
      setNom(""); setEmail(""); setNumero(""); setService(0); setMessage(""); setCharCount(0);
    } catch {
      setFormError("Impossible d'envoyer le message. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main" id="main-content">
      <div className="page-title">
        <div className="container">
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" aria-hidden="true" /> Accueil</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Me joindre</li>
            </ol>
          </nav>
          <div className="title-wrapper">
            <h1 className="gradient-text">Discutons de votre projet.</h1>
            <p>Décrivez-moi votre idée, je vous réponds sous 24h.</p>
          </div>
        </div>
      </div>

      <div className="container section-pb" data-aos="fade-up">

        {/* ── Cartes d'info contact ── */}
        <div className="contact-info-grid">
          {CONTACT_INFO.map((card, i) => (
            <div
              className="contact-card"
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <div className="contact-icon-box">
                <i className={`bi ${card.icon}`} aria-hidden="true" />
              </div>
              <h3>{card.title}</h3>
              {card.href ? (
                <a href={card.href} className="contact-card-link" target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {card.lines.map((l, j) => <span key={j}>{l}</span>)}
                </a>
              ) : (
                <p>{card.lines.map((l, j) => <span key={j}>{l}<br /></span>)}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Formulaire ── */}
        <div className="contact-form-card" data-aos="fade-up" data-aos-delay="100">
          <div className="contact-form-header">
            <div>
              <h3>Envoyez un message</h3>
              <p>Je vous répondrai dans les meilleurs délais.</p>
            </div>
            <div className="contact-response-time">
              <span className="status-dot" aria-hidden="true" />
              Répond en &lt; 24h
            </div>
          </div>

          {/* Alerte succès */}
          {success && (
            <div className="alert-success-dark" role="status" aria-live="polite" ref={successRef}>
              <div className="alert-icon-wrap">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
              </div>
              <div>
                <strong>Message envoyé avec succès !</strong>
                <p>Merci pour votre message. Je vous contacterai très bientôt.</p>
              </div>
            </div>
          )}

          {/* Alerte erreur */}
          {formError && (
            <div className="alert-error-dark" role="alert" aria-live="assertive">
              <i className="bi bi-exclamation-triangle" aria-hidden="true" />
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
            <p className="required-note">
              <span aria-hidden="true">*</span> Tous les champs sont obligatoires
            </p>

            <div className="form-row-dark">
              <div className="form-group-dark">
                <label className="form-label-dark" htmlFor="nom">
                  Nom &amp; Prénoms
                  <span className="field-required" aria-hidden="true"> *</span>
                </label>
                <input
                  id="nom"
                  type="text"
                  className="dark-input"
                  placeholder="Votre nom complet"
                  value={nom_client}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  autoComplete="name"
                  aria-required="true"
                  minLength={2}
                />
              </div>

              <div className="form-group-dark">
                <label className="form-label-dark" htmlFor="email">
                  Adresse email
                  <span className="field-required" aria-hidden="true"> *</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="dark-input"
                  placeholder="votre@email.com"
                  value={email_client}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-row-dark">
              <div className="form-group-dark">
                <label className="form-label-dark" htmlFor="numero">
                  Numéro WhatsApp
                  <span className="field-required" aria-hidden="true"> *</span>
                </label>
                <input
                  id="numero"
                  type="tel"
                  className="dark-input"
                  placeholder="+225 07 00 00 00 00"
                  value={numero_client}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                  autoComplete="tel"
                  aria-required="true"
                />
              </div>

              <div className="form-group-dark">
                <label className="form-label-dark" htmlFor="service">
                  Service souhaité
                  <span className="field-required" aria-hidden="true"> *</span>
                </label>
                <select
                  id="service"
                  className="dark-select dark-input"
                  value={service_client}
                  onChange={(e) => setService(Number(e.target.value))}
                  required
                  aria-required="true"
                >
                  <option value={0} disabled>
                    {fetchLoading ? "Chargement…" : "— Sélectionnez un service —"}
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.nom_categorie}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group-dark">
              <div className="form-label-row">
                <label className="form-label-dark" htmlFor="message">
                  Message
                  <span className="field-required" aria-hidden="true"> *</span>
                </label>
                <span className="char-counter" aria-live="polite">
                  {charCount} / 1000
                </span>
              </div>
              <textarea
                id="message"
                className="dark-textarea dark-input"
                rows={6}
                placeholder="Décrivez votre projet, vos besoins, votre délai…"
                value={message_client}
                onChange={(e) => { setMessage(e.target.value); setCharCount(e.target.value.length); }}
                required
                aria-required="true"
                maxLength={1000}
              />
            </div>

            <div className="form-submit-row">
              <p className="form-privacy-note">
                <i className="bi bi-lock-fill" aria-hidden="true" />
                Vos données ne seront jamais partagées.
              </p>
              <button
                type="submit"
                className={`btn-primary-dark ${loading ? "btn-loading" : ""}`}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner btn-spinner" aria-hidden="true" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill" aria-hidden="true" />
                    Envoyer le message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
