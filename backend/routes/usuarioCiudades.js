const express = require('express');
const router = express.Router();
const { enviarCiudad, mostrarCiudad, eliminarCiudad } = require('../controllers/usuarioCiudades')

router.post('/:id/agregar', enviarCiudad)
router.get('/misciudades', mostrarCiudad)
router.delete('/:id/eliminar', eliminarCiudad)


module.exports = router