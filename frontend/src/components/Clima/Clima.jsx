import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Buscador } from '../Buscador/Buscador';
import { Tarjeta } from '../Tarjeta-clima/Tarjeta';
import { usuarioContext } from '../../App';
import { useNavigate } from 'react-router-dom';



const Clima = () => {
  const { username } = useContext(usuarioContext)
  const navegar = useNavigate()
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
  const enviarCiudad = async (ciudad) => {
    try{
      const response = await axios.post(`https://pronostico-ya-server.vercel.app/usuario/${username}/agregar-ciudad`, {ciudad})
      setCargando(true)
      navegar(`/usuario/${username}`)
      window.location.reload()
      setCargando(false)
    }
    catch(error){
      console.log(error)
    }
  }
  return(
    <>
      <Buscador nuevaUbicacion = {obtenerUbicacion} />
      <Tarjeta 
      mostrarInformacion = {mostrar}
      cargandoInformacion = {cargando}
      clima = {clima}
      pronostico = {pronostico}
      enviarCiudad = {enviarCiudad}
      />
    </>
  )
}

export { Clima }