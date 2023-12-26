import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Hoja de estilos/Formulario.css'
const FormRegistrarse = () => {

  const[email, setEmail] = useState('')
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const navegar = useNavigate()

  const manejarEnvio = async (e)=>{
    e.preventDefault()
    try{
      await axios.post('/auth/registrarse',{email, username, password})
      alert('Registro exitoso')
      setEmail('')
      setPassword('')
      setUsername('')
      navegar('/auth/iniciar-sesion')
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <>
    <h1 className='form-titulo' style={{textAlign:'center', marginBottom:'1rem'}}>Registrarse</h1>
    <form className='form-usuario' onSubmit={manejarEnvio}>
      <input type="email" placeholder='Email...' name='email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="text" placeholder='Nombre de usuario...' name='username' onChange={(e)=>setUsername(e.target.value)}/>
      <input type="password" placeholder='Contraseña...' name='password' onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Registrarse</button>
    </form>
    <div className='form-pregunta'>
      <p>Ya tienes una cuenta?</p>
      <span>/</span>
      <a href="/auth/iniciar-sesion">Iniciar Sesion</a>
      <span>/</span>
      <a href="/">Volver al Inicio</a>
    </div>
    
    </>
  )
}

export { FormRegistrarse }