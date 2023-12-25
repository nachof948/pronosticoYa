import './App.css';
import React, { useEffect, useState } from 'react';
import { Clima } from './indice';
import { NavBar } from './components/NavBar/NavBar';

function App() {  
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
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
        <div>
          <NavBar />
          <Clima />
        </div>
      )}
    </div>
  );
}

export default App;

