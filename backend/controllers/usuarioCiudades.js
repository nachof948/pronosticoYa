const Usuario = require('../models/Usuario')
const Ciudad = require('../models/CiudadElegida')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const mostrarCiudad = async (req, res)=>{
    const authorization = req.get('authorization')
    let token = null
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN)
    if(!token || !decodedToken){
        return res.status(401).json({mensaje:'Token invalido'})
    }
    const usuarioId = decodedToken.id
    try{
        const usuarioCiudades = await Ciudad.findOne({usuario: usuarioId})
        return res.send(usuarioCiudades)
    }
    catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }
}


const enviarCiudad = async (req, res) => {
    const { username } = req.params;
    const { ciudadActual } = req.body;

    try {
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        let ciudadesUsuario = await Ciudad.findOne({ usuario: usuario._id });

        if (!ciudadesUsuario) {
            ciudadesUsuario = await Ciudad.create({
                usuario: usuario._id,
                ciudades: [
                    {
                        nombreActual: ciudadActual,
                    }
                ]
            });
        } else {
            ciudadesUsuario.ciudades.push({
                    nombreActual: ciudadActual
            });
            await ciudadesUsuario.save();
        }

        return res.status(200).json({ mensaje: 'Ciudades agregadas correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener la ciudad' });
    }
};



module.exports= {enviarCiudad, mostrarCiudad}
