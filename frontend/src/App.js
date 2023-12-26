import './App.css';
import React  from 'react';
import { Home } from './indice';
import { Routes, Route } from 'react-router-dom'

function App() {  
  return (
    <body className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth/registrarse'></Route>
        <Route path='/auth/iniciar-sesion'></Route>
      </Routes>
    </body>
  );
}

export default App;

