import { useState } from "react";

const API_URL = 'http://localhost:8080/contas/login';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login({ email, senha }) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      const data = await response.json();

      setIsLoggedIn(true);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error, isLoggedIn };
}
