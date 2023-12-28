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
            <div>
              <h2>Ciudades</h2>
              <div className='contenedor-usuario'>
                {ciudadesActuales.map((ciudad, index) => (
                  <div className='tarjeta-img' key={index}>
{/*                     <button onClick={() => eliminarCiudad(ciudad.name)}>-</button> */}
                    <h3 className='tarjeta-titulo'>{ciudad.name}</h3>
                    <p className='tarjeta-fecha'>{fechaActual}</p>
                    <h1 className='tarjeta-temp'>{(ciudad.main.temp - 273.15).toFixed(1)}</h1>
                    <p className='tarjeta-descripcion'>
                      <img className='tarjeta-icon' src={ciudad.urlIcon} alt="" />
                      {ciudad.weather[0].description}
                    </p>
                    <img className='img' src={imagen} alt="Ciudad" />
                  </div>
                ))}
                {ciudadesPronostico.map((ciudad, index) => {
                return (
                  <div key={index}>
                    <h1>{(ciudad.list[1].main.temp - 273.15).toFixed(1)}</h1>
                    <h1>{(ciudad.list[2].main.temp - 273.15).toFixed(1)}</h1>
                    <img src={ciudad.urlIcon3} alt="" />
                    <img src={ciudad.urlIcon6} alt="" />
                  </div>
                );
                })}
              </div>
            </div>
          }
          {!ciudadesActuales && <div>No hay ciudades</div>}
        </>
      )}
    </>
  );
};

export { Usuario };
