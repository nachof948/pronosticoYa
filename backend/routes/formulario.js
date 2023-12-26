const express = require('express');
const router = express.Router();
const { registrarse, iniciarSesion } = require('../controllers/formulario')

/* POST */
router.post('/registrarse', registrarse)
router.post('/iniciar-sesion', iniciarSesion)

module.exports = router
