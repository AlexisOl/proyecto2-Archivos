const express = require('express')
const controladorUsuario = require('../controller/userController.js')

const rutas = express.Router();



//rutas para usuarios
rutas.get('/prueba', controladorUsuario.obtenerUsuario)
rutas.post('/prueba', controladorUsuario.crearUsuario)


module.exports  = {
    rutas
}