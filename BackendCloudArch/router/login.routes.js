const express = require('express')
const controladorUsuario = require('../controller/userController.js')
const archivoControlador = require('../controller/archivosController.js')
const carpetasControlador = require('../controller/carpetaController.js')

const rutas = express.Router();



//rutas para usuarios
rutas.get('/prueba', controladorUsuario.obtenerUsuario);
rutas.post('/prueba', controladorUsuario.crearUsuario);

// empleados
// archivos
rutas.post('/ingresoArchivo', archivoControlador.crearArchivo);
rutas.get('/obtenerArchivos', archivoControlador.obtenerArchivos);
rutas.put('/editarArchivo', archivoControlador.editarArchivos);
rutas.post('/copiarArchivo', archivoControlador.copiarArchivo);
rutas.delete('/eliminarArchivo', archivoControlador.eliminarArchivo);
rutas.put('/moverArchivo', archivoControlador.moverArchivo);
rutas.get('/buscarDirectoriosParecidos', archivoControlador.buscarDirectorioParcial);
rutas.post('/compartirArchivo', archivoControlador.compartirArchivos);


//carpetas
rutas.post('/ingresoCarpetas', carpetasControlador.creaCarpeta);
rutas.get('/obtenerCarpetas', carpetasControlador.obtenCarpetas);
rutas.get('/obtenerArchivosDirectorio', carpetasControlador.obtenArchivosDirectorio);
rutas.get('/obtenerCarpetasDirectorio', carpetasControlador.obtenerCarpetasDirectorio);
rutas.post('/copiarCarpeta', carpetasControlador.copiarCarpetas);
rutas.delete('/eliminarCarpeta', carpetasControlador.eliminarCarpetas);

rutas.put('/moverCarpetas', carpetasControlador.moverCarpeta);




//------ ADMIN ----------
//-----------------------
rutas.get('/verPapeleraGeneral', archivoControlador.verPapeleraGeneral);
rutas.get('/verPapeleraCarpetasGeneral', carpetasControlador.verCarpetasEliminadas);




module.exports  = {
    rutas
}