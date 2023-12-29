import React from 'react';
import { FormRegistrarse } from './Form-resgistrarse';
import  Lluvia  from './Imagenes/Lluvia.jpg'
import Icono from './Imagenes/Favicon.png'

const Registrarse = () => {
  return(
    <>
    <header className='header-form'>
      <a href='/'>PronósticoYa!</a>
      <img className='form-icono' src={Icono} alt="" />
    </header>
    <section className='section-form'>
      <div className="contenedor-form">
        <img src={Lluvia} alt="" width={"300px"} />
        <div className='contenedor-input'>
          <FormRegistrarse />
        </div>
      </div>
    </section>
    </>
  )
}

export { Registrarse }