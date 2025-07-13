import { useState, useEffect } from "react";

const API_URL = 'http://localhost:8080';

export function useTransacao(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transacoes, setTransacoes] = useState([]); 

  useEffect(() => {
    async function fetchTransacoes() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/transacoes/${userId}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar transações. Status: ' + response.status);
        }

        const data = await response.json();
        setTransacoes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchTransacoes();
    }
  }, [userId]);

  return { transacoes, loading, error};
}