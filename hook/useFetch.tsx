import api from "@/utils/axios";
import { useState, useEffect } from "react";
import axios from "axios";

/* Cache mémoire partagé — survit aux re-renders, vidé au rechargement de page */
const cache = new Map<string, unknown>();

export default function useFetch(url: string) {
  const [data,    setData]    = useState<unknown>(cache.get(url) ?? null);
  const [loading, setLoading] = useState(!cache.has(url));
  const [error,   setError]   = useState<unknown>(null);

  useEffect(() => {
    /* Données déjà en cache → rendu instantané */
    if (cache.has(url)) {
      setData(cache.get(url)!);
      setLoading(false);
      return;
    }

    let active = true;
    const controller = new AbortController();

    setLoading(true);
    api
      .get(url, { signal: controller.signal })
      .then((res) => {
        if (!active) return;
        cache.set(url, res.data);
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (!active || axios.isCancel(err)) return;
        setError(err.response?.data ?? err.message);
        setData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
