import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import './Hoja de estilos/Formulario.css'

const FormRegistrarse = () => {
  const {register, formState:{errors}, handleSubmit, reset } = useForm()
  const[email, setEmail] = useState('')
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const navegar = useNavigate()

  const manejarEnvio = async (e)=>{
    try{
      await axios.post('https://pronostico-ya-server.vercel.app/auth/registrarse', {email, username, password})
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
    <h1 className='form-titulo' >Registrarse</h1>
    <form className='form-usuario' onSubmit={handleSubmit(manejarEnvio)}>
      <input 
      {...register('email', { required:true,     pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'El correo electrónico no es válido'
      }})}
      type="email" placeholder='Email...' name='email' onChange={(e)=>setEmail(e.target.value)}/>
      <div>
        {errors.email?.type === 'required' && <p className='error'>El campo email es requerido</p>}
        {errors.email?.type === 'pattern' && <p className='error'>${errors.email.message}</p>}
      </div>

      <input {...register('username', {required:true})}
      type="text" placeholder='Nombre de usuario...' name='username' onChange={(e)=>setUsername(e.target.value)}/>
      <div>
        {errors.username?.type === 'required'&& <p className='error'>El campo nombre es requerido</p>}
      </div>
      
      
      <input {...register('password', {required:true})} 
      type="password" placeholder='Contraseña...' name='password' onChange={(e)=>setPassword(e.target.value)}/>
      <div>
        {errors.password?.type === 'required'&& <p className='error'>El campo contraseña es requerido</p>}
      </div>
      
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