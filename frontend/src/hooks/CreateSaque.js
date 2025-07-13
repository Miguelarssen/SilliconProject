import { useState } from "react";

const API_URL = 'http://localhost:8080/contas/saque';

export function CreateSaque() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sacar({ id, valor, senha}) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, valor, senha})
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

  return { sacar, loading, error };
}
