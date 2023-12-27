import React, { useContext} from 'react';
import { usuarioContext } from '../../App';

const Usuario = () => {
  const { username, token } = useContext(usuarioContext)
/*   const [ciudades, setCiudades] = useState([])
  useEffect(async () => {
    const response = await axios.get(`/usuario/${username}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    setCiudades(response.data)
  },[]) */
  return(
    <>
      <h1>Bienvenido/a {username} a PronosticoYa!</h1>
{/*       {ciudades.map(ciudad =>{
        const {nombreCiudad } = ciudad
        return(
          <ul>
            <li>{nombreCiudad}</li>
          </ul>
        )
      })} */}
    </>
  )
}

export { Usuario }