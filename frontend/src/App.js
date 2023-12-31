import './App.css';
import React,{createContext}  from 'react';
import { Home, IniciarSesion, Registrarse, Usuario } from './indice';
import { Routes, Route } from 'react-router-dom'

export const usuarioContext = createContext()


function App() {  
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const usuarioLogueado = localStorage.getItem('token') !== null

  return (
    <usuarioContext.Provider 
    value={{
      token,
      username,
      usuarioLogueado
    }}>
      <body className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/auth/registrarse' element={<Registrarse />}></Route>
        <Route path='/auth/iniciar-sesion' element={<IniciarSesion />}></Route>
        <Route path={`/usuario/${username}`} element={<Usuario />}></Route>
      </Routes>
    </body>
    </usuarioContext.Provider>
  );
}

export default App;

