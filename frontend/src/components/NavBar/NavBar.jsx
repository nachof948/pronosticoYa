import React, { useContext } from 'react';
import './Hoja de estilo/NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
const NavBar = () => {
  const { usuarioLogueado, username } = useContext(usuarioContext)
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
          <img src="./Favicon.png" alt="" />
        </div>
        <nav className="navbar-enlaces">
          <button onClick={cerrarSesion}><span><i class="bi bi-person-fill"></i></span>{username}</button>
        </nav>
      </div>
      }
      {!usuarioLogueado && 
      <div className='navbar'>
        <div className='navbar-titulo'>
          <a href='/'>PronósticoYa!</a>
          <img src="./Favicon.png" alt="" />
        </div>
        <nav className='navbar-enlaces'>
          <Link to={'/auth/registrarse'} >Registrarse</Link>
          <Link to={'/auth/iniciar-sesion'} >Iniciar Sesion</Link>
        </nav>
      </div>
      }
        </header>
  )
}

export { NavBar }