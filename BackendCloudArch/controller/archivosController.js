const archivo = require('../models/archivos.js')



//funcion para ingreso de archiovs
const crearArchivo = async(req, res) => {
    console.log(req.body);

    const insertarArchivo = new archivo (
        {
            nombre: req.body.nombre,
            contenido: req.body.contenido,
            extension: req.body.extension,
            ubicacion: req.body.ubicacion,
            usuario: req.body.usuario,

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


//funcion para editar archivos

const editarArchivos = async (req, res) => {
    const { identificador, archivoEnviado } = req.body;
    console.log(archivoEnviado, identificador);
    try {
        const actualizar = await archivo.updateOne(
            { _id: identificador },
            {
                $set: {
                    nombre: archivoEnviado.nombre,
                    contenido: archivoEnviado.contenido,
                    extension: archivoEnviado.extension
                }
            },
            { new: true }
        );

        if (actualizar) {
            res.json(actualizar);
        } else {
            res.json({ error: "No se encontró el archivo" });
        }
    } catch (error) {
        console.error("Error al actualizar el archivo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


module.exports = {
    crearArchivo: crearArchivo,
    obtenerArchivos: obtenerArchivos,
    editarArchivos: editarArchivos
}