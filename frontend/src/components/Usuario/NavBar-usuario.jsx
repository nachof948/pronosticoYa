import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import icono from './Img/Favicon.png'

const NavBarUsuario = () => {
  const { usuarioLogueado, username, token } = useContext(usuarioContext)
  const navegar = useNavigate()
  const cerrarSesion = ()=>{
    localStorage.removeItem('token')
    navegar('/')
    window.location.reload()
  }

  return(
    <header>
    {usuarioLogueado && 
    <div className='navbar'>
      <div className="navbar-titulo">
        <a href='/'>PronósticoYa!</a>
        <img src={icono} alt="" />
      </div>
      <nav className="navbar-enlaces">
        <button onClick={cerrarSesion}>Cerrar Sesion</button>
      </nav>
    </div>
    }
  </header>
)
}

export { NavBarUsuario }