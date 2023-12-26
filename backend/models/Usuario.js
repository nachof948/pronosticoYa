const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    email:{
        type: String
    },
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String
    }
})
const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario