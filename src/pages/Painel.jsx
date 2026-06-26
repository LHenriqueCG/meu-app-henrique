import { Outlet, Link }
  from 'react-router-dom';

function Painel() {
  return (
    <div>
      
      <nav>
        <Link to="/home">
        Home
        </Link>
        <Link to="sobre">
          Sobre
        </Link>
        <Link to="Contato">
          Contato
        </Link>
      </nav>

      {/* filho renderiza aqui */}
      <Outlet />
    </div>
  );
}

export {Painel}