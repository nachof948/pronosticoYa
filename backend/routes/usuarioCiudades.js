const express = require('express');
const router = express.Router();
const { enviarCiudad} = require('../controllers/usuarioCiudades')

router.post('/:username/agregar-ciudad', enviarCiudad)


module.exports = router