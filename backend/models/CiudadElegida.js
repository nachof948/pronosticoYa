const mongoose = require('mongoose');

const ciudadElegidaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    ciudades: [
        {
            nombreActual: String
        }
    ]
});

const Ciudad = mongoose.model('Ciudades', ciudadElegidaSchema);
module.exports = Ciudad;
