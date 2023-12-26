import React from 'react';
import { FormIniciarSesion } from './Form-inciar sesion';
import Icono from './Imagenes/Favicon.png'
import Sol from './Imagenes/Sol.jpg'
const IniciarSesion = () => {
  return(
    <div>
          <header className='header-form'>
      <a href='/'>PronósticoYa!</a>
      <img className='form-icono' src={Icono} alt="" />
    </header>
    <section className='section-form'>
      <div className="contenedor-form">
        <img src={Sol} alt="" />
        <div className='contenedor-input'>
          <FormIniciarSesion />
        </div>
      </div>
    </section>
    </div>
  )
}

export { IniciarSesion }