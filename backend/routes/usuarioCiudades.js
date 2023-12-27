const express = require('express');
const router = express.Router();
const { enviarCiudad, mostrarCiudad } = require('../controllers/usuarioCiudades')

router.post('/:username/agregar-ciudad', enviarCiudad)
router.get('/:username', mostrarCiudad)


module.exports = router