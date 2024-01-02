import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import './Hoja de estilos/Formulario.css'

const FormRegistrarse = () => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    mode: 'all',
  });

  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false)
  

  const navegar = useNavigate()

  const manejarEnvio = async (values) => {
    try {
      setCargando(true)
      const response = await axios.post('https://pronostico-ya-server.vercel.app/auth/registrarse', values)
      setCargando(false)
      navegar('/auth/iniciar-sesion')
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setCargando(false)
        setError(true);
      } else {
        console.log(error);
      }
    }
  }
  return(
    <>
    <h1 className='form-titulo' >Registrarse</h1>
    <form className='form-usuario' onSubmit={handleSubmit(manejarEnvio)}>
      <input 
      {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
      type="text" placeholder='Email...' name='email' 
      />
      <div>
        {error && <p className='error-email'>Este email ya esta registrado</p>}
        {errors.email?.type === 'required' && <p className='error'>El campo email es requerido</p>}
        {errors.email?.type === 'pattern' && <p className='error'>El correo electrónico no es válido</p>}
      </div>

      <input {...register('username', {required:true})}
      type="text" placeholder='Nombre de usuario...' name='username' />
      <div>
        {errors.username?.type === 'required'&& <p className='error'>El campo nombre es requerido</p>}
      </div>
      
      
      <input {...register('password', {required:true})} 
      type="password" placeholder='Contraseña...' name='password' />
      <div>
        {errors.password?.type === 'required'&& <p className='error'>El campo contraseña es requerido</p>}
      </div>
      {cargando ? (
        <div class="loader"></div>
      ) :(
        <div>
          <button type='submit'>Registrarse</button>
        </div>
      )}

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