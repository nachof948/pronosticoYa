import React from 'react';
import './Hoja de estilo/BurgerButton.css'
const BurgerButton = ({click, manejarClick}) => {
  return(
    <div className={`icon nav-icon-5 ${click ? 'open' : ''}`} onClick={manejarClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export { BurgerButton }