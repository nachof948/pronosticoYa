import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import './Hoja de estilos/Formulario.css'

const FormIniciarSesion = () => {
  const { register, formState: { errors, isDirty, isValid }, handleSubmit, setValue } = useForm({
    mode: 'onChange' // Activar detección de cambios para validar mientras se escribe
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navegar = useNavigate();

  useEffect(() => {
    if (isDirty) {
      if (username === 'username') { 
        setValue('username', username);
      }
      if (password === 'password') { 
        setValue('password', password);
      }
    }
  }, [isDirty, username, password, setValue]);
  
  const manejarInciarSesion = async (e)=>{
    try{
      const response = await axios.post('https://pronostico-ya-server.vercel.app/auth/iniciar-sesion', {username, password})
      const token = response.data.token
      const nombreUsuario = response.data.username
      setUsername('')
      setPassword('')
      localStorage.setItem('token', token)
      localStorage.setItem('username', nombreUsuario)
      navegar(`/`)
      window.location.reload()
    }
    catch(error){ 
        if (error.response && error.response.status === 401) {
          setError(true);
        } else {
          console.log(error);
        }
      
    }
  }

  return(
    <>
      <h1 className='form-titulo' style={{textAlign:'center'}}>Iniciar Sesion</h1>
      <form className='form-usuario' onSubmit={handleSubmit(manejarInciarSesion)}>
        <input {...register('username', {required:true})}
        type="text" placeholder='Nombre de usuario...' name='username'value={username} onChange={(e)=> setUsername(e.target.value)} autoComplete={username}/>
        <div>
          {errors.username?.type === 'required' && !isValid && <p className='error'>El campo nombre de usuario es requerido</p>}
        </div>

        <input {...register('password', {required:true})}
        type="password" placeholder='Contraseña...' value={password} name='password' onChange={(e)=> setPassword(e.target.value)} autoComplete={password} />
        <div>
          {error && <p className='error-email'>Usuario o contraseña incorrecta</p>}
          {errors.password?.type === 'required' && !isValid && <p className='error'>El campo contraseña es requerido</p>}
        </div>
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