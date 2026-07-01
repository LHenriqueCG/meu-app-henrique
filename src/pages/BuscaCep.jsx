import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function BuscaCep() {
  const { id } = useParams(); 
  
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const pegarEndereco = async () => {
      try {
        setErro('');
        
        // 1. Mudamos o link para o servidor da BrasilAPI
        const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${id}`);
        
        // Se a BrasilAPI retornar um erro (como CEP inexistente), ela responde com status 404
        if (!resposta.ok) {
          setErro('Infelizmente esse CEP não foi encontrado na BrasilAPI.');
          setEndereco(null);
          return;
        }

        const dados = await resposta.json();
        setEndereco(dados);

      } catch (err) {
        setErro('Não foi possível conectar à BrasilAPI. Verifique sua internet ou bloqueios de rede.');
        console.error(err);
      }
    };

    pegarEndereco();
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Buscador de CEP (BrasilAPI)</h2>
      <p>Você tentou buscar o CEP: <strong>{id}</strong></p>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* 2. Ajustamos os nomes que a BrasilAPI entrega (street, neighborhood, city, state) */}
      {endereco && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', display: 'inline-block', textAlign: 'left' }}>
          <p><strong>Rua:</strong> {endereco.street || 'Não informado'}</p>
          <p><strong>Bairro:</strong> {endereco.neighborhood || 'Não informado'}</p>
          <p><strong>Cidade:</strong> {endereco.city}</p>
          <p><strong>Estado:</strong> {endereco.state}</p>
        </div>
      )}
    </div>
  );
}