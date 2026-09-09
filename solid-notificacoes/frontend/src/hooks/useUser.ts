import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
}

interface UseUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useUser(id: number): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function buscarUsuario() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Erro ${res.status} ao buscar usuário`);

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    buscarUsuario();
    return () => controller.abort();
  }, [id]);

  return { user, loading, error };
}