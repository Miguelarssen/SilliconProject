import { useState } from "react";

const API_URL = 'http://localhost:8080/pessoas';

export function CreatePessoa() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function cadastroPessoa({ nome, cpf, nascimento, email}) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cpf, nascimento, email})
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar pessoa');
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

  return { cadastroPessoa, loading, error };
}
