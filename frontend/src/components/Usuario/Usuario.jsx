import React, { useContext, useEffect, useState } from 'react';
import { usuarioContext } from '../../App';
import axios from 'axios';
import imagen from './Ciudad.jpg'
import './Hoja de estilo/Usuario.css'


const Usuario = () => {
  const { username, token } = useContext(usuarioContext);
  const API_KEY= '56fc54e07cbc820b405d4839fad15d5a'
  const [ciudadesActuales, setCiudadesActuales] = useState([]);
  const [ciudadesPronostico, setCiudadesPronostico] = useState([]);
  const [ cargando, setCargando] = useState(false);

  /* Fecha */
  let fecha = new Date()
  let dia = fecha.getDate()
  let mes = fecha.getMonth() + 1
  let año = fecha.getFullYear()

  let fechaActual = `${dia}/${mes}/${año}` 

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/usuario/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const ciudades = response.data.ciudades;

      // Obtener el clima actual para las ciudades
      const ciudadesActualesPromises = ciudades.map(async (ciudad) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&lang=es&q=${ciudad}`);
        return response.data;
      });

      const ciudadesActualesInfo = await Promise.all(ciudadesActualesPromises);
      const ciudadesActualesIcon = ciudadesActualesInfo.map((ciudad) => {
        const urlImg = `https://openweathermap.org/img/wn/`;
        const urlIcon = `${urlImg}${ciudad.weather[0].icon}.png`;
        return { ...ciudad, urlIcon };
      });
      setCiudadesActuales(ciudadesActualesIcon);

      // Obtener el pronóstico para las mismas ciudades
      const ciudadesPronosticoPromises = ciudades.map(async (ciudad) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}&lang=es&q=${ciudad}`);
        return response.data;
      });

      const ciudadesPronosticoInfo = await Promise.all(ciudadesPronosticoPromises);
      const ciudadesPronosticoIcon = ciudadesPronosticoInfo.map((ciudad) => {
        const urlImg = `https://openweathermap.org/img/wn/`;
        
        const urlIcon3 = `${urlImg}${ciudad.list[1].weather[0].icon}.png`;
        const urlIcon6 = `${urlImg}${ciudad.list[2].weather[0].icon}.png`;
        const urlIcon9 = `${urlImg}${ciudad.list[3].weather[0].icon}.png`;
        return { ...ciudad, urlIcon3, urlIcon6, urlIcon9};
      });
      setCiudadesPronostico(ciudadesPronosticoIcon);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [username, token]);

  


/*   const eliminarCiudad = async(ciudadActual)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?&appid=56fc54e07cbc820b405d4839fad15d5a&lang=es&q=${ciudadActual}`
    console.log(url);
    try{
      await axios.delete(`/usuario/${username}/eliminar`, {data: {url}})
      alert(`Se elimino ${ciudadActual}`)
      window.location.reload()
    }
    catch(error){
      console.log('Error')
    }
  } */

  return (
    <>
      {cargando ? (
        <div className='presentacion'>
          <div>
            <h1>PronósticoYa!</h1>
          </div>
          <div className="container">
            <div className="cloud front">
              <span className="left-front"></span>
              <span className="right-front"></span>
            </div>
            <span className="sun sunshine"></span>
            <span className="sun"></span>
            <div className="cloud back">
              <span className="left-back"></span>
              <span className="right-back"></span>
            </div>
          </div>
        </div>
      ) : (
        <>

          <a href="/">Buscar más ciudades</a>
          {ciudadesActuales && 
            <main className='main-usuario' >
              <h2>Ciudades</h2>
              {ciudadesActuales.map((ciudad, index) => (
              <div className='contenedor-usuario'>
              
                <div className="usuario-tarjeta">
                  
                    <div className='usuario-actual-img' key={index}>
{/*                     <button onClick={() => eliminarCiudad(ciudad.name)}>-</button> */}
                      <h3 className='usuario-actual-titulo'>{ciudad.name}</h3>
                      <p className='usuario-actual-fecha'>{fechaActual}</p>
                      <h1 className='usuario-actual-temp'>{(ciudad.main.temp - 273.15).toFixed(1)}</h1>
                      <p className='usuario-actual-descripcion'>
                        <img className='usuario-actual-icon' src={ciudad.urlIcon} alt="" />
                        {ciudad.weather[0].description}
                      </p>
                      <img className='usuario-fondo' src={imagen} alt="Ciudad" />
                    </div>
                </div>
                  <div className="usuario-info" >
                    <div className="usuario-detalles">
                      <p className='usuario-sensacion'>Sensación térmica:<span>{(ciudad.main.feels_like - 273.15).toFixed(1)}°C</span></p>
                      <p className='usuario-sensacion'>Humedad: <span>{(ciudad.main.humidity)}%</span></p>
                      <p className='usuario-sensacion'>Presion: <span>{(ciudad.main.pressure)}hPa</span></p>
                      <p className='usuario-sensacion after'>Velocidad del Viento:<span>{(ciudad.wind.speed)}m/s</span></p>
                    </div>
                    {ciudadesPronostico.map((pronostico, index) => {
                return (
                  <div className='usuarios-pronosticos' key={index}>
                    
                    <div className="usuario-pronostico">
                      <img src={pronostico.urlIcon3} alt="" />
                      <h1>{(pronostico.list[1].main.temp - 273.15).toFixed(1)}</h1>
                    </div>
                    <div className="usuario-pronostico">
                      <img src={pronostico.urlIcon6} alt="" />
                      <h1>{(pronostico.list[2].main.temp - 273.15).toFixed(1)}</h1>
                    </div>
                    <div className="usuario-pronostico">
                      <img src={pronostico.urlIcon9} alt="" />
                      <h1>{(pronostico.list[3].main.temp - 273.15).toFixed(1)}</h1>
                    </div>
                  </div>
                  );
              })} 
                  </div>
              </div>
              ))}
            </main>
          }
          {!ciudadesActuales && <div>No hay ciudades</div>}
        </>
      )}
    </>
  );
};

export { Usuario };
