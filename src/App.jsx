import { Routes, Route } from 'react-router-dom';
import { Home }    from './pages/Home';
import { Sobre }   from './pages/Sobre';
import { Contato } from './pages/Contato';
import { Painel }  from './pages/Painel';
import { BuscaCep } from './pages/BuscaCep'; // Importa a página do CEP
import './App.css'

function App() {
  return (
    <>
      <div>
        <Painel/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          
          {/* ESSA LINHA ABAIXO É O SEGREDO QUE FALTAVA: */}
          <Route path="/cep/:id" element={<BuscaCep />} />
          
          <Route path="*" element={'Pagina Não Encontrada ERRO:404'} />
        </Routes>
      </div>
    </>
  )
}

export default App;