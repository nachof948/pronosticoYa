import React, { useContext, useEffect, useState } from 'react';
import { usuarioContext } from '../../App';
import axios from 'axios';
import imagen from './Ciudad.jpg'
import './Hoja de estilo/Usuario.css'

const Usuario = () => {
  const { username, token } = useContext(usuarioContext);
  const [ciudades, setCiudades] = useState([]);
  const [ cargando, setCargando] = useState(false);

  /* Fecha */
  let fecha = new Date()
  let dia = fecha.getDate()
  let mes = fecha.getMonth() + 1
  let año = fecha.getFullYear()

  let fechaActual = `${dia}/${mes}/${año}`

  useEffect(() => {
    const fetchData = async () => {
    setCargando(true)
      try {
        const response = await axios.get(`/usuario/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.data && response.data.ciudades && response.data.ciudades.length > 0) {
          const dataCiudades = response.data.ciudades;
          const citiesData = []; // Array para almacenar los datos de todas las ciudades
  
          for (const ciudad of dataCiudades) {
            const url = ciudad.nombreActual; // O ajusta para ciudad.nombrePronostico si es necesario
            const ciudadActual = await axios.get(url);
  
            const urlImg = `https://openweathermap.org/img/wn/`;
            const urlIcon = `${urlImg}${ciudadActual.data.weather[0].icon}.png`; // Definición de urlIcon para cada ciudad
  
            citiesData.push({
              ...ciudadActual.data,
              urlIcon // Almacena la URL del ícono junto con los datos de cada ciudad
            });
          }
          setCiudades(citiesData); // Actualiza el estado con los datos de todas las ciudades
          setCargando(false)
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData(); 
  }, [username, token]);

  const eliminarCiudad =()=>{
    alert('Se elimino la ciudad')
  }

  return (
    <>
      {cargando ? (
        <div className='presentacion'>
          <div>
            <h1>Bienvenido/a {username} a PronosticoYa!</h1>
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
          {ciudades && ciudades.length > 0 ? (
            <div>
              <h2>Ciudades</h2>
              <div className='contenedor-usuario'>
                {ciudades.map((ciudad, index) => (
                  <div className='tarjeta-img' key={index}>
                    <button onClick={eliminarCiudad}>-</button>
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
              </div>
            </div>
          ) : (
            <div>No hay ciudades</div>
          )}
        </>
      )}
    </>
  );
};

export { Usuario };
