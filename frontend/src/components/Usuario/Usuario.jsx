import React, { useContext, useEffect, useState } from 'react';
import { usuarioContext } from '../../App';
import axios from 'axios';

const Usuario = () => {
  const { username, token } = useContext(usuarioContext);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/usuario/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCiudades(response.data.ciudad); 
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData(); 
  }, [username, token]); 

  return (
    <>
      <h1>Bienvenido/a {username} a PronosticoYa!</h1>
      <a href="/">Buscar más ciudades</a>
      {ciudades && ciudades.length > 0 ? (
        <div>
          <h2>Ciudades</h2>
          <ul>
            {ciudades.map((ciudad, index) => (
              <ul key={index}>
                <li>Nombre: <strong>{ciudad.nombreCiudad.name}</strong></li>
                <li>Temperatura: {(ciudad.nombreCiudad.main.temp - 273.15).toFixed(1)} °C</li>
              </ul>
            ))}
          </ul>
        </div>
      ) : (
        <div>No hay ciudades</div>
      )}
    </>
  );
      }
export { Usuario };
