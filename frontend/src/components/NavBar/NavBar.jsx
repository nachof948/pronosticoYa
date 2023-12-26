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
    <header >
      {usuarioLogueado && 
      <div className='navbar'>
        <h1>PronósticoYa</h1>
        <img src="./Favicon.png" alt="" />
        <button style={{color: 'black'}} onClick={cerrarSesion}>{username}</button>
      </div>
      }
      {!usuarioLogueado && 
      <div className='navbar'>
        <h1>PronósticoYa</h1>
        <img src="./Favicon.png" alt="" />
        <Link to={'/auth/registrarse'} style={{color: 'white'}}>Registrarse</Link>
      </div>
      }
        </header>
  )
}

export { NavBar }