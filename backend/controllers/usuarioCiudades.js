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


const enviarCiudad = async (req, res) =>{
    const { username } = req.params
    const { ciudad } = req.body
    try{
        /* Buscamos el usuario */
        const usuario = await Usuario.findOne({username})
        /* Si el usuario no esta */
        if(!usuario){
            return res.status(404).json({mensaje:'Usuario no encontrado'})
        }
        
        /* Buscamos si el usuario tiene ciduades agregadas */
        let ciudadesUsuario = await Ciudad.findOne({ usuario: usuario._id })
        /* Si no tiene ninguna ciudad agregada */
        if(!ciudadesUsuario){
            ciudadesUsuario = await Ciudad.create({usuario: usuario._id, ciudad:[]})
        }
        ciudadesUsuario.ciudad.push({nombreCiudad: ciudad})
        await ciudadesUsuario.save()

        return res.status(200).json({mensaje:'Ciudad agregada correctamente'})
    }
    catch(error){
        return res.status(500).json({mensaje:'Error al obtener la ciudad'})
    }
}

module.exports= {enviarCiudad, mostrarCiudad}
