import React,{useState, useEffect} from 'react';
import { NavBar, Clima} from '../../indice'
import './Hoja de estilo/Home.css'

const Home = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 2000);
  }, []);
  return(
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
          <NavBar/>
          <main>
            <Clima/>
          </main>
        </>
    )}
    </>
  )
}

export { Home }