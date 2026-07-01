import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos o assistente de navegação
import Posts from "../components/Posts";

function Home() {
  // 2. Criamos o estado para guardar o CEP que o usuário digitar
  const [cepDigitado, setCepDigitado] = useState('');
  
  // 3. Ativamos a função de navegar
  const navigate = useNavigate();

  // 4. Função que roda ao enviar o formulário
  const irParaPaginaDoCep = (e) => {
    e.preventDefault(); // Evita que a página recarregue

    // Remove traços ou pontos digitados
    const cepLimpo = cepDigitado.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 números.');
      return;
    }

    // 5. Redireciona para a rota dinâmica que criamos no App.jsx
    navigate(`/cep/${cepLimpo}`);
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Bem-vindo!</p>
      
      {/* --- INÍCIO DO BLOCO DO CEP --- */}
      <div style={{ margin: '30px 0', padding: '20px', border: '1px dashed #ccc', display: 'inline-block' }}>
        <h3>Buscar Endereço</h3>
        <form onSubmit={irParaPaginaDoCep}>
          <input
            type="text"
            placeholder="Digite o CEP (ex: 01001000)"
            value={cepDigitado}
            onChange={(e) => setCepDigitado(e.target.value)}
            maxLength={9}
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '8px 15px', marginLeft: '10px', cursor: 'pointer' }}>
            Buscar
          </button>
        </form>
      </div>
      </div>
  );
};

export { Home };