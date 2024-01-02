import React, { useContext,useState } from 'react';
import './Hoja de estilo/NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import { BurgerButton } from './BurgerButton';
const NavBar = () => {
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
          <img src="./Favicon.png" alt="" />
        </div>
        <nav className={click ? "navbar-enlaces active" : "navbar-enlaces"}>
          <a href={`/usuario/${username}`} ><span><i class="bi bi-person-fill"></i></span>{username}</a>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </nav>
        <BurgerButton click={click} manejarClick={manejarClick} />
        <div className={`initial ${click ? 'active' : ''}`}></div>
      </div>
      }
      {!usuarioLogueado && 
      <div className='navbar'>
        <div className='navbar-titulo'>
          <a href='/'>PronósticoYa!</a>
          <img src="./Favicon.png" alt="" />
        </div>
        <nav className={click ? "navbar-enlaces active" : "navbar-enlaces"}>
          <Link to={'/auth/registrarse'} >Registrarse</Link>
          <Link to={'/auth/iniciar-sesion'} >Iniciar Sesión</Link>
        </nav>
        <BurgerButton click={click} manejarClick={manejarClick} />
        <div className={`initial ${click ? 'active' : ''}`}></div>
      </div>
      }
        </header>
  )
}

export { NavBar }