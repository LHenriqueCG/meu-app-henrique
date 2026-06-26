import { Routes, Route, Link }
  from 'react-router-dom';
import {Home}    from './pages/Home';
import {Sobre}   from './pages/Sobre';
import {Contato} from './pages/Contato';
import {Painel} from './pages/Painel';
import './App.css'




function App() {
  

  return (
    <>
      <div>
      
      <Painel/>

      <Routes>
        <Route path="/home"
          element={<Home />} />
        <Route path="/sobre"
          element={<Sobre />} />
        <Route path="/contato"
          element={<Contato />} />
        <Route path="*"
          element={'Pagina Não Encontrada ERRO:404'} />
      </Routes>
    </div>
    </>
  )
}

export default App