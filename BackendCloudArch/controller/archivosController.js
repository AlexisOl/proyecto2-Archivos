const archivo = require('../models/archivos.js')



//funcion para ingreso de archiovs
const crearArchivo = async(req, res) => {
    console.log(req.body);

    const insertarArchivo = new archivo (
        {
            nombre: req.body.nombre,
            contenido: req.body.contenido,
            extension: req.body.extension
        }
    )

    const nuevoArchivo = await insertarArchivo.save();
    res.json(nuevoArchivo);
};


// funcion para obtener de archivos
const obtenerArchivos = async(req, res) => {

    const archivoFinal = await archivo.find();
    res.json(archivoFinal);

};


module.exports = {
    crearArchivo: crearArchivo,
    obtenerArchivos: obtenerArchivos
}