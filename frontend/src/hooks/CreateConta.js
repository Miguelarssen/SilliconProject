import { useState } from "react";

const API_URL = 'http://localhost:8080/contas';

export function CreateConta() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function cadastroConta({ pessoaId, tipoConta, senha, limiteSaqueDiario}) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pessoaId, tipoConta, senha, limiteSaqueDiario})
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar conta');
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

  return { cadastroConta, loading, error };
}
