import React,{useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import { BurgerButton } from '../NavBar/BurgerButton'
import icono from './Img/Favicon.png'


const NavBarUsuario = () => {
  const { usuarioLogueado, username, token } = useContext(usuarioContext)
  const navegar = useNavigate()
  const cerrarSesion = ()=>{
    localStorage.removeItem('token')
    navegar('/')
    window.location.reload()
  }
  const [click, setClick] = useState(false)
  const manejarClick = ()=>{
    setClick(!click)
  }
  return(
    <header>
    {usuarioLogueado && 
    <div className='navbar'>
      <div className="navbar-titulo">
        <a href='/'>PronósticoYa!</a>
        <img src={icono} alt="" />
      </div>
      <nav className={click ? "navbar-enlaces active" : "navbar-enlaces"}>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </nav>
      <BurgerButton click={click} manejarClick={manejarClick} />
      <div className={`initial ${click ? 'active' : ''}`}></div>
    </div>
    }
  </header>
)
}

export { NavBarUsuario }