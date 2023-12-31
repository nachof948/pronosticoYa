const mongoose = require('mongoose');

const ciudadElegidaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    ciudades: [
        {
            type: String,
            unique: true
        }
    ]
});

const Ciudad = mongoose.model('Ciudades', ciudadElegidaSchema);
module.exports = Ciudad;
