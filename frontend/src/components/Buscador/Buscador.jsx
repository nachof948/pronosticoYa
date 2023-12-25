import React,{useState} from 'react';
import './Hoja de estilo/Buscador.css'
const Buscador = ({nuevaUbicacion}) => {
  const [ciudad, setCiudad] = useState('');
  
  const buscarCiudad = (e)=>{
    e.preventDefault()
    console.log({ciudad})
    if(ciudad === '' || !ciudad) return
    nuevaUbicacion(ciudad)
  }


  return(
    <div className='contenedor-buscador'>
      <form action="" onSubmit={buscarCiudad}>
        <input type="text" placeholder='Buscar ciudad...' onChange={(e)=>setCiudad(e.target.value)} />
        <button type='submit'>Buscar</button>
      </form>
    </div>
  )
}

export { Buscador }