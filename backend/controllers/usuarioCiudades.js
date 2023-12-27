const Usuario = require('../models/Usuario')
const Ciudad = require('../models/CiudadElegida')
const jwt = require('jsonwebtoken')
require('dotenv').config()



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

module.exports= {enviarCiudad}
