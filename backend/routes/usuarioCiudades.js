const express = require('express');
const router = express.Router();
const { enviarCiudad, mostrarCiudad, eliminarCiudad } = require('../controllers/usuarioCiudades')

router.post('/:username/agregar-ciudad', enviarCiudad)
router.get('/:username', mostrarCiudad)
router.delete('/:username/eliminar', eliminarCiudad)


module.exports = router