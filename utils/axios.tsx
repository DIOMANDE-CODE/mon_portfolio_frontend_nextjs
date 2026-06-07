import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
  /* withCredentials retiré : ce portfolio est public (lecture seule),
     le preflight CORS était inutile et ajoutait ~50-150 ms par requête */
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isCancel(error)) {
      console.error("Erreur API :", error.response?.data ?? error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
