import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Hoja de estilos/Formulario.css'
import Swal from 'sweetalert2'
const FormIniciarSesion = () => {

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const navegar = useNavigate()
  
  const manejarInciarSesion = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('https://pronostico-ya-server.vercel.app/auth/iniciar-sesion', {username, password})
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Bienvenido/a ${username} a PronósticoYa!`,
        showConfirmButton: false,
        timer: 1500,
        background: '#3b757f', // Color de fondo
      });
      const token = response.data.token
      const nombreUsuario = response.data.username
      setUsername('')
      setPassword('')
      localStorage.setItem('token', token)
      localStorage.setItem('username', nombreUsuario)
      alert
      navegar(`/`)
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
  }

  return(
    <>
      <h1 className='form-titulo' style={{textAlign:'center'}}>Iniciar Sesion</h1>
      <form className='form-usuario' onSubmit={manejarInciarSesion}>
        <input type="text" placeholder='Nombre de usuario...' name='username' onChange={(e)=> setUsername(e.target.value)} />
        <input type="password" placeholder='Contraseña...' name='password' onChange={(e)=> setPassword(e.target.value)} />
        <button type='submit'>Iniciar Sesion</button>
      </form>
      <div className='form-pregunta'>
      <p>No tienes una cuenta?</p>
      <span>/</span>
      <a href="/auth/registrarse">Registrarse</a>
      <span>/</span>
      <a href="/">Volver al Inicio</a>
    </div>
    </>
  )
}

export { FormIniciarSesion }