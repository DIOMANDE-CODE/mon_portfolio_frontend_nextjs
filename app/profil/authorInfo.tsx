"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useFetch from "@/hook/useFetch";

export default function AuthorInfo() {
  interface Author_Info {
    id: number;
    photo_profil: string;
    nom: string;
    fonctions: string;
    slogan: string;
    nombre_projet: number;
    nombre_recompense: number;
    lien_facebook: string;
    lien_instagram: string;
    lien_linkedin: string;
    lien_twitter: string;
    lien_github: string;
    biographie: string;
  }

  const { data, error, loading } = useFetch("users/list/")
  // Declaration du state de AuthorInfo
  const [authorInfo, setAuthorInfo] = useState<Author_Info[]>([]);

  useEffect(() => {
    if (data){      
      setAuthorInfo(data)
    }
  }, [data]);
  

  if (loading) return <div id="preloader"></div>;
  if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;

  return (
    <>
      {authorInfo.map((author) => (
        <div className="col-lg-4 mb-4 mb-lg-0" key="author-info">
          <div className="author-card" data-aos="fade-up">
            <div className="author-image flex justify-center items-center">
              <Image
                width={5000}
                height={5000}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${author.photo_profil}`}
                priority
                alt="Author"
                className="img-fluid rounded"
              />
            </div>
            <div className="author-info">
              <h2>{author.nom}</h2>
              <p className="designation">{author.fonctions}</p>
              <div className="author-bio">
                <b>{author.slogan}</b>
              </div>

              <div className="social-links">
                {author.lien_facebook && (
                  <a
                    href={author.lien_facebook}
                    className="facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-facebook" />
                  </a>
                )}

                {author.lien_github && (
                  <a
                    href={author.lien_github}
                    className="github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-github" />
                  </a>
                )}

                {author.lien_instagram && (
                  <a
                    href={author.lien_instagram}
                    className="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-instagram" />
                  </a>
                )}

                {author.lien_linkedin && (
                  <a
                    href={author.lien_linkedin}
                    className="linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-linkedin" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
