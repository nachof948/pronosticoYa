import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const IniciarSesion = () => {
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const navegar = useNavigate()
  const manejarInciarSesion = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('/auth/iniciar-sesion', {username, password})
      const token = response.data.token
      const nombreUsuario = response.data.username
      setUsername('')
      setPassword('')
      localStorage.setItem('token', token)
      localStorage.setItem('username', nombreUsuario)
      alert(`Hola ${username} bienvenido/a PronósticoYa!`)
      navegar('/')
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
  }

  return(
    <>
      <form action="" onSubmit={manejarInciarSesion}>
        <input type="text" placeholder='Nombre de usuario...' name='username' onChange={(e)=> setUsername(e.target.value)} />
        <input type="password" placeholder='Contraseña...' name='password' onChange={(e)=> setPassword(e.target.value)} />
        <button type='submit'>Iniciar Sesion</button>
      </form>
    </>
  )
}

export { IniciarSesion }