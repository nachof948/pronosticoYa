import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registrarse = () => {
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
    <form action="" onSubmit={manejarEnvio}>
      <input type="email" placeholder='Email...' name='email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="text" placeholder='Nombre de usuario...' name='username' onChange={(e)=>setUsername(e.target.value)}/>
      <input type="password" placeholder='Contraseña...' name='password' onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Registrarse</button>
    </form>
    <a href="/auth/iniciar-sesion">Iniciar Sesion</a>
    </>
  )
}

export { Registrarse }