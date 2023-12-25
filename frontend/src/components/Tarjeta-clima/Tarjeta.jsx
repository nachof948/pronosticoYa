import React from 'react';
import './Hoja de estilo/Tarjeta.css'
import { Cargando } from '../Cargando/Cargando';
import imagenCiudad from './Ciudad.jpg'
const Tarjeta = ({mostrarInformacion, cargandoInformacion, clima, pronostico}) => {
  
  /* Fecha de la temperatura actual */
  let hoy = new Date()
  let dia = hoy.getDate()
  let mes =  hoy.getMonth() + 1
  let año = hoy.getFullYear()
  let fecha = `${dia}/${mes}/${año}`
  
  /* Temperatura principal */
  let url = ""
  let urlIcon = ""
  
  /* Fecha de las temperaturas posteriores */
  let pronosticoFecha3=''
  let pronosticoFecha6=''
  let pronosticoFecha9=''


  /* Temperaturas posteriores */
  let urlIcon3 = ""
  let urlIcon6 = ""
  let urlIcon9 = ""

  if(cargandoInformacion){
    return <Cargando />
  }
  if(mostrarInformacion){
    url = `https://openweathermap.org/img/wn/`
    urlIcon = `${url}${clima.weather[0].icon}.png`
    
    /* Iconos */
    urlIcon3 = `${url}${pronostico.list[1].weather[0].icon}.png`
    urlIcon6 = `${url}${pronostico.list[2].weather[0].icon}.png`
    urlIcon9 = `${url}${pronostico.list[3].weather[0].icon}.png`
    
    /* Fechas */
    pronosticoFecha3 = pronostico.list[1].dt_txt.substring(8, 10) + '/' + pronostico.list[1].dt_txt.substring(5, 7) + '/' + pronostico.list[1].dt_txt.substring(0, 4) + ' ' +pronostico.list[1].dt_txt.substring(11, 16)
    pronosticoFecha6 = pronostico.list[2].dt_txt.substring(8, 10) + '/' + pronostico.list[2].dt_txt.substring(5, 7) + '/' + pronostico.list[2].dt_txt.substring(0, 4) + ' ' +pronostico.list[2].dt_txt.substring(11, 16)
    pronosticoFecha9 = pronostico.list[3].dt_txt.substring(8, 10) + '/' + pronostico.list[3].dt_txt.substring(5, 7) + '/' + pronostico.list[2].dt_txt.substring(0, 4) + ' ' +pronostico.list[3].dt_txt.substring(11, 16)
  }
  return(
    <section>
      {mostrarInformacion ? (
        <div className='contenedor-tarjeta'>
          <div className='tarjeta'>
            <div className='tarjeta-img'>
              <h3 className='tarjeta-titulo'>{clima.name}</h3>
              <p className='tarjeta-fecha'>{fecha}</p>
              <h1 className='tarjeta-temp'>{(clima.main.temp - 273.15).toFixed(1)}°C</h1>
              <p className='tarjeta-descripcion'><img className='tarjeta-icon' src={urlIcon} alt="Icon" />{clima.weather[0].description}</p>
              <img className='img' src={imagenCiudad}alt="Ciudad" />
            </div>
            <div className='tarjeta-info'>
              <div className='mas-detalles'>
                <p className='sensacion'>Sensación térmica:<span>{(clima.main.feels_like - 273.15).toFixed(1)}°C</span></p>
                <p className='sensacion'>Humedad: <span>{(clima.main.humidity)}%</span></p>
                <p className='sensacion'>Presion: <span>{(clima.main.pressure)}hPa</span></p>
                <p className='sensacion'>Velocidad del Viento:<span>{(clima.wind.speed)}m/s</span></p>
              </div>
              <hr/>
              <div className='pronosticos'>
                <div className="pronostico">
                  <p className='sensacion pron-fecha'>{pronosticoFecha3}hs</p>
                  <p className='sensacion pron-detalles'><img src={urlIcon3} alt="Icono" />{pronostico.list[1].weather[0].description}</p>
                  <p className='pron-temp'>{(pronostico.list[1].main.temp - 273.15).toFixed(1)}°C</p>
                </div>
                <div className="pronostico">
                  <p className='sensacion pron-fecha'>{pronosticoFecha6}hs</p>
                  <p className='sensacion pron-detalles'><img src={urlIcon6} alt="Icono" />{pronostico.list[2].weather[0].description}</p>
                  <p className='pron-temp'>{(pronostico.list[2].main.temp - 273.15).toFixed(1)}°C</p>
                </div>
                <div className="pronostico">
                  <p className='sensacion pron-fecha'>{pronosticoFecha9}hs</p>
                  <p className='sensacion pron-detalles'><img src={urlIcon9} alt="Icono" />{pronostico.list[3].weather[0].description}</p>
                  <p className='pron-temp'>{(pronostico.list[3].main.temp - 273.15).toFixed(1)}°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ):(
        <h2>Sin Datos</h2>
      )}
    </section>
  )
}

export { Tarjeta }