import React, { useContext, useEffect, useState } from 'react';
import { usuarioContext } from '../../App';
import { NavBarUsuario } from '../../indice'
import axios from 'axios';
import imagen from './Img/Ciudad.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'
import './Hoja de estilo/Usuario.css'



const Usuario = () => {
  const { username, token, usuarioLogueado } = useContext(usuarioContext);
  const API_KEY= '56fc54e07cbc820b405d4839fad15d5a'
  const [ciudades, setCiudades]= useState([])
  const [ cargando, setCargando] = useState(true);
  useEffect(()=>{AOS.init()},[])

  /* Fecha */
  let fecha = new Date()
  let dia = fecha.getDate()
  let mes = fecha.getMonth() + 1
  let año = fecha.getFullYear()

  let fechaActual = `${dia}/${mes}/${año}` 
    useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 3500);
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pronostico-ya-server.vercel.app/usuario/${username}`, {
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

      
      const infoCiudades = ciudades.map((ciudadIndex, index) => {
        return {
          nombre: ciudadesActualesInfo[index].name,
          tempActual: (ciudadesActualesInfo[index].main.temp - 273.15).toFixed(1),
          fechaActual: fechaActual,
          descripcionActual: ciudadesActualesInfo[index].weather[0].description,
          urlIcon: `https://openweathermap.org/img/wn/${ciudadesActualesInfo[index].weather[0].icon}.png`,
          sensacionTermica:(ciudadesActualesIcon[index].main.feels_like - 273.15).toFixed(1),
          humedad:(ciudadesActualesIcon[index].main.humidity),
          presion:(ciudadesActualesIcon[index].main.pressure),
          velViento:(ciudadesActualesIcon[index].main.pressure),
          tempPronostico3: (ciudadesPronosticoIcon[index].list[1].main.temp - 273.15).toFixed(1),
          tempPronostico6: (ciudadesPronosticoIcon[index].list[2].main.temp - 273.15).toFixed(1),
          tempPronostico9: (ciudadesPronosticoIcon[index].list[3].main.temp - 273.15).toFixed(1),
          urlIcon3: `https://openweathermap.org/img/wn/${ciudadesPronosticoIcon[index].list[1].weather[0].icon}.png`,
          urlIcon6: `https://openweathermap.org/img/wn/${ciudadesPronosticoIcon[index].list[2].weather[0].icon}.png`,
          urlIcon9: `https://openweathermap.org/img/wn/${ciudadesPronosticoIcon[index].list[3].weather[0].icon}.png`,
          descripcionPronostico3:ciudadesPronosticoIcon[index].list[1].weather[0].description,
          descripcionPronostico6:ciudadesPronosticoIcon[index].list[2].weather[0].description,
          descripcionPronostico9:ciudadesPronosticoIcon[index].list[3].weather[0].description,
          pronosticoFecha3: ciudadesPronosticoIcon[index].list[1].dt_txt.substring(8, 10) + '/' + ciudadesPronosticoIcon[index].list[1].dt_txt.substring(5, 7) + '/' + ciudadesPronosticoIcon[index].list[1].dt_txt.substring(0, 4) + ' ' +ciudadesPronosticoIcon[index].list[1].dt_txt.substring(11, 16),
          pronosticoFecha6: ciudadesPronosticoIcon[index].list[2].dt_txt.substring(8, 10) + '/' + ciudadesPronosticoIcon[index].list[2].dt_txt.substring(5, 7) + '/' + ciudadesPronosticoIcon[index].list[2].dt_txt.substring(0, 4) + ' ' +ciudadesPronosticoIcon[index].list[2].dt_txt.substring(11, 16),
          pronosticoFecha9: ciudadesPronosticoIcon[index].list[3].dt_txt.substring(8, 10) + '/' + ciudadesPronosticoIcon[index].list[3].dt_txt.substring(5, 7) + '/' + ciudadesPronosticoIcon[index].list[2].dt_txt.substring(0, 4) + ' ' +ciudadesPronosticoIcon[index].list[3].dt_txt.substring(11, 16)
        };
      });
      setCiudades(infoCiudades)

    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [username, token]);
const eliminarCiudad = async (ciudad) => {
  const confirmacion = await Swal.fire({
    title: `Seguro que quieres eliminar ${ciudad}?`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`,
    confirmButtonColor: "#325158",
    denyButtonColor: "#325158", 
    background: '#3b757f',
  });

  if (confirmacion.isConfirmed) {
    try {
      await axios.delete(`https://pronostico-ya-server.vercel.app/usuario/${username}/eliminar`, { data: { ciudad } });
      window.location.reload();
    } catch (error) {
      console.log('Error al eliminar', error);
    }
  } else if (confirmacion.isDenied) {
    Swal.fire({
      title: "No se eliminó",
      icon: "info",
      text: "",
      confirmButtonColor: "#3b757f", 
      background: '#3b757f',
    });
  }
};

  return (
    <>
    {cargando ? ( <div className='presentacion'>
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
        </div>):(
    <>
    <NavBarUsuario/>
    <div className="usuario-contenedor">
      {ciudades.length > 0 &&
        <div className='usuario-titulo'>
            <h1>Tus ciudades</h1>
            <a href="/">Buscar más</a>
        </div>
      }
      {ciudades.map((ciudad, index)=>{
        return(
        <div className='contenedor-tarjeta'>
            <div className='tarjeta-usuario' data-aos="zoom-in" data-aos-duration="750">
              <div className='tarjeta-img'>
                <h3 className='tarjeta-titulo'>{ciudad.nombre}</h3>
                <p className='tarjeta-fecha'>{ciudad.fechaActual}</p>
                <h1 className='tarjeta-temp'>{ciudad.tempActual}°C</h1>
                <p className='tarjeta-descripcion'><img className='tarjeta-icon' src={ciudad.urlIcon} alt="Icon" />{ciudad.descripcionActual}</p>
                <img className='img' src={imagen} alt="Ciudad" />
              </div>
              <div className='tarjeta-info'>
                <div className="contenedor-info">
                  <div className='mas-detalles'>
                    <p className='sensacion'>Sensación térmica:<span>{ciudad.sensacionTermica}°C</span></p>
                    <p className='sensacion'>Humedad: <span>{ciudad.humedad}%</span></p>
                    <p className='sensacion'>Presion: <span>{ciudad.presion}hPa</span></p>
                    <p className='sensacion'>Velocidad del Viento:<span>{ciudad.velViento}m/s</span></p>
                  </div>
                    <button className='btn-agregar' onClick={()=>eliminarCiudad(ciudad.nombre)}>-</button>
                </div>
                <hr/>
                <div className='pronosticos'>
                  <div className="pronostico">
                    <p className='sensacion pron-fecha'>{ciudad.pronosticoFecha3}hs</p>
                    <p className='sensacion pron-detalles'><img src={ciudad.urlIcon3} alt="Icono" />{ciudad.descripcionPronostico3}</p>
                    <p className='pron-temp'>{ciudad.tempPronostico3}°C</p>
                  </div>
                  <div className="pronostico">
                    <p className='sensacion pron-fecha'>{ciudad.pronosticoFecha3}hs</p>
                    <p className='sensacion pron-detalles'><img src={ciudad.urlIcon6} alt="Icono" />{ciudad.descripcionPronostico6}</p>
                    <p className='pron-temp'>{ciudad.tempPronostico6}°C</p>
                  </div>
                  <div className="pronostico">
                    <p className='sensacion pron-fecha'>{ciudad.pronosticoFecha9}hs</p>
                    <p className='sensacion pron-detalles'><img src={ciudad.urlIcon9} alt="Icono" />{ciudad.descripcionPronostico9}</p>
                    <p className='pron-temp'>{ciudad.tempPronostico9}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        )
      })}
      </div>
        {ciudades.length === 0 && 
        <div className='mensaje-usuario'>
          <h1>No hay ciudad agregadas</h1>
          <a href="/">Buscar ciudades</a>
        </div>
        }
      </>
    )}
    </>
  );
};

export { Usuario };
