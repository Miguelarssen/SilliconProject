import { useState } from "react";

const API_URL = 'http://localhost:8080/contas/deposito';

export function CreateDeposito() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function depositar({ id, valor }) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, valor })
      });

      if (!response.ok) {
        throw new Error('Erro ao efetuar depósito');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { depositar, loading, error };
}
