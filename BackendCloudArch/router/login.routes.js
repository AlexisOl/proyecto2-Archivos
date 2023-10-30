const express = require('express')
const controladorUsuario = require('../controller/userController.js')
const archivoControlador = require('../controller/archivosController.js')
const carpetasControlador = require('../controller/carpetaController.js')

const rutas = express.Router();



//rutas para usuarios
rutas.get('/prueba', controladorUsuario.obtenerUsuario)
rutas.post('/prueba', controladorUsuario.crearUsuario)

// empleados
// archivos
rutas.post('/ingresoArchivo', archivoControlador.crearArchivo)
rutas.get('/obtenerArchivos', archivoControlador.obtenerArchivos)
rutas.put('/editarArchivo', archivoControlador.editarArchivos)


//carpetas
rutas.post('/ingresoCarpetas', carpetasControlador.creaCarpeta)
rutas.get('/obtenerCarpetas', carpetasControlador.obtenCarpetas)
rutas.get('/obtenerArchivosDirectorio', carpetasControlador.obtenCarpetasDirectorio)


module.exports  = {
    rutas
}