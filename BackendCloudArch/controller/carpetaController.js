const archivos = require('../models/archivos.js');
const carpertas = require('../models/carpertas.js')



//funcion para ingreso de archiovs
const creaCarpeta = async(req, res) => {
    console.log(req.body);

    const insertarArchivo = new carpertas (
        {
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            ubicacion: req.body.ubicacion,
            tipo: req.body.tipo,
            archivos : req.body.archivos
        }
    )

    const nuevoArchivo = await insertarArchivo.save();
    res.json(nuevoArchivo);
};


// funcion para obtener de archivos
const obtenCarpetas = async(req, res) => {

    const carpetasFinales = await carpertas.find();
    res.json(carpetasFinales);

};

// funcion para obtener de archivos en base a directorio
const obtenCarpetasDirectorio = async(req, res) => {
    const {ubicacion, usuario} = req.query;
    console.log(ubicacion);
    //archivos
    
    const archivosCarpeta = await archivos.find({ubicacion:ubicacion, usuario:usuario});
    if (archivosCarpeta) {
        console.log(archivosCarpeta);
        res.json(archivosCarpeta);

    } else {
        res.json({error: "no se pudo encontrar"});

    }

};



module.exports = {
    creaCarpeta: creaCarpeta,
    obtenCarpetas: obtenCarpetas,
    obtenCarpetasDirectorio: obtenCarpetasDirectorio
}