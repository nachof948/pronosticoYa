const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./db/conexion')
const formulario = require('./routes/formulario')
const usuarioCiudades = require('./routes/usuarioCiudades')
const cors = require('cors')
require('dotenv').config()

/* PUERTO */
const PUERTO = process.env.PUERTO
/* Configuracion de cors */
app.use(cors({
    origin:['https://pronostico-ya.vercel.app', 'http://localhost:3000'],
    methods:['GET', 'POST','PUT','DELETE'],
    credentials:true
}))

/* Configuracion del formulario */
app.use(express.json())
app.use(express.urlencoded({ extended:false}))


/* Rutas */
app.use('/auth', formulario)
app.use('/usuario', usuarioCiudades)

app.get('/',(req, res) =>{
    res.send('<h1>Bienvenido</h1>')
})

/* Conexion a la base de datos */
const iniciar = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PUERTO, ()=> {console.log(`Se inicio el servidor en http://localhost:${PUERTO}/`)})
    }
    catch(error){
        console.log(error)
    }
}
iniciar()