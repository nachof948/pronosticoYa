import React from 'react';

const Prueba = () => {

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
                      </div>
                      ))}
                      {ciudadesActuales.map((ciudad, index) =>(
                                          <div className="usuario-info" key={index } >
                                          <div className="usuario-detalles">
                                            <p className='usuario-sensacion'>Sensación térmica:<span>{(ciudad.main.feels_like - 273.15).toFixed(1)}°C</span></p>
                                            <p className='usuario-sensacion'>Humedad: <span>{(ciudad.main.humidity)}%</span></p>
                                            <p className='usuario-sensacion'>Presion: <span>{(ciudad.main.pressure)}hPa</span></p>
                                            <p className='usuario-sensacion after'>Velocidad del Viento:<span>{(ciudad.wind.speed)}m/s</span></p>
                                          </div>
                                        </div>
                      ))}
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
                    </main>
                  }
                  {!ciudadesActuales && <div>No hay ciudades</div>}
                </>
              )}
            </>
          );
        };
    


export { Prueba }