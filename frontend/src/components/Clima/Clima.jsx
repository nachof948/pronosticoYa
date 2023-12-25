import React, {useState} from 'react';
import axios from 'axios';
import { Buscador } from '../Buscador/Buscador';
import { Tarjeta } from '../Tarjeta-clima/Tarjeta';
const Clima = () => {
  const API_KEY= '56fc54e07cbc820b405d4839fad15d5a'
  let urlClima = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&lang=es`
  let ciudadUrl = '&q='
  
  let urlPronostico = `https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}&lang=es`

  const [clima, setClima] = useState([])
  const [pronostico, setPronostico] = useState([])
  const [cargando, setCargando] = useState(false)
  const [mostrar, setMostrar] = useState(false)
  const [ubicacion, setUbicacion] = useState('')
  
  const obtenerUbicacion = async(ubi) =>{
    setCargando(true)
    setUbicacion(ubi)

    //urlClima
    urlClima = urlClima + ciudadUrl + ubi
    await axios.get(urlClima)
    .then(response => {
      console.log(response.data)
      setClima(response.data)
    })
    .catch(error =>{
      console.log(error)
      setCargando(false)
      setMostrar(false)
    })

    //Pronostico
    urlPronostico = urlPronostico + ciudadUrl + ubi
    await axios.get(urlPronostico)
    .then(response =>{
      console.log(response.data)
      setPronostico(response.data)
      setCargando(false)
      setMostrar(true)
    })
    .catch(error =>{
      console.log(error)
      setCargando(false)
      setMostrar(false)
    })
  }
  return(
    <div>
      <Buscador nuevaUbicacion = {obtenerUbicacion} />
      <Tarjeta 
      mostrarInformacion = {mostrar}
      cargandoInformacion = {cargando}
      clima = {clima}
      pronostico = {pronostico}/>
    </div>
  )
}

export { Clima }