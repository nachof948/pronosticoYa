const express = require('express');
const router = express.Router();
const { enviarCiudad, mostrarCiudad, eliminarCiudad } = require('../controllers/usuarioCiudades')

router.post('/misciudades/agregar-ciudad', enviarCiudad)
router.get('/misciudades', mostrarCiudad)
router.delete('/misciudades/eliminar', eliminarCiudad)


module.exports = router