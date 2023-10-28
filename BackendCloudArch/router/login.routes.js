const express = require('express')
const controladorUsuario = require('../controller/userController.js')
const archivoControlador = require('../controller/archivosController.js')

const rutas = express.Router();



//rutas para usuarios
rutas.get('/prueba', controladorUsuario.obtenerUsuario)
rutas.post('/prueba', controladorUsuario.crearUsuario)

// empleados
// archivos
rutas.post('/ingresoArchivo', archivoControlador.crearArchivo)
rutas.get('/obtenerArchivos', archivoControlador.obtenerArchivos)


module.exports  = {
    rutas
}