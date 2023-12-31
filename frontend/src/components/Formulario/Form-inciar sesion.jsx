import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Hoja de estilos/Formulario.css';

const FormIniciarSesion = () => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    mode: 'all',
  });

  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false)
  const navegar = useNavigate();

  const manejarInciarSesion = async (values) => {
    try {
      setCargando(true)
      const response = await axios.post('https://pronostico-ya-server.vercel.app/auth/iniciar-sesion', values);
      const token = response.data.token;
      const nombreUsuario = response.data.username;
      const id = response.data.id;
      localStorage.setItem('token', token);
      localStorage.setItem('username', nombreUsuario);
      localStorage.setItem('id',id)
      setCargando(false)
      navegar(`/`);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setCargando(false)
        setError(true);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className='form-titulo' style={{textAlign:'center'}}>Iniciar Sesión</h1>
      <form className='form-usuario' onSubmit={handleSubmit(manejarInciarSesion)}>
        <input
          {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
          type="text"
          placeholder='Email...'
          name='email'
          // Elimina el controlador innecesario
        />
        <div>
          {errors.email?.type === 'required' && <p className='error'>El campo email es requerido</p>}
          {errors.email?.type === 'pattern' && <p className='error'>El correo electrónico no es válido</p>}
        </div>


        <input
          {...register('password', { required: true })}
          type="password"
          placeholder='Contraseña...'
          name='password'
          // Elimina el controlador innecesario
        />
        <div>
          {error && <p className='error-email'>Usuario o contraseña incorrecta</p>}
          {errors.password?.type === 'required' && (
            <p className='error'>El campo contraseña es requerido</p>
          )}
        </div>
        {cargando ? (
        <div class="loader"></div>
      ) :(
        <div>
          <button type='submit'>Iniciar Sesión</button>
        </div>
      )}
      </form>
      <div className='form-pregunta'>
      <p>No tienes una cuenta?</p>
      <span>/</span>
      <a href="/auth/registrarse">Registrarse</a>
      <span>/</span>
      <a href="/">Volver al Inicio</a>
    </div>
    </>
  );
};

export { FormIniciarSesion };