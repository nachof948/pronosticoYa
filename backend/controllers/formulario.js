const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario')
require('dotenv').config()

/* Registrarse */
const registrarse = async(req, res)=>{
    try{
        /* Tomamos los datos del formulario */
        const {email, username, password} = req.body
        /* Encriptamos la contraseña */
        const hashPassword = await bcrypt.hash(password,10)
        /* Creamos un nuevo usuario en la base de datos */
        const nuevoUsuario = new Usuario({email, username, password: hashPassword})
        /* Guardar el usuario en la base de datos */
        await nuevoUsuario.save()
        /* Enviamos un mensaje de confirmacion */
        res.status(201).send('El usuario se registro exitosamente')
    }
    catch(err){
        res.status(500).send('Error al registrarse'+ err)
    }
}

/* Iniciar sesion */
const iniciarSesion = async(req, res) => {
    try{
        /* Tomamos los datos del formulario */
        const {username, password} = req.body
        /* Buscamos ese usuario en la base de datos */
        const buscarUsuario = await Usuario.findOne({username})
        /* Si no esta el usuario en la base de datos */
        if(!buscarUsuario){
            res.status(401).send('Usuario o contraseña incorrecta')
        }
        /* Si el usuario existe validamos lo contraseña */
        const validarPassword = await bcrypt.compare(password, buscarUsuario.password)
        /* Si la contraseña no coincide */
        if(!validarPassword){
            res.status(401).send('Usuario o contraseña incorrecta')
        }
        /* Eligimos la informacion que vamos a tomar del usuario  */
        const infoUsuario = {
            id: buscarUsuario._id,
            username: buscarUsuario.username
        }
        /* Creamos el token */
        const token = jwt.sign(infoUsuario, process.env.TOKEN)
        res.send({
            id: buscarUsuario._id,
            username: buscarUsuario.username,
            token
        })
    }
    catch(err){
        res.status(500).send('Error al iniciar sesion' + err)
    }
}
module.exports = {registrarse, iniciarSesion}