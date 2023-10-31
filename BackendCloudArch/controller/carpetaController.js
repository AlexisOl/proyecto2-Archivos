const archivos = require('../models/archivos.js');
const carpertas = require('../models/carpertas.js')



//funcion para ingreso de archiovs
const creaCarpeta = async(req, res) => {
    console.log(req.body);

    const insertarArchivo = new carpertas (
        {
            nombre: req.body.nombre,
            usuarioAsociado: req.body.usuario,
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
const obtenArchivosDirectorio = async(req, res) => {
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

//funcion para obtener carpetas en base a directoio y usuario
const obtenerCarpetasDirectorio= async (req, res) => {
    const {ubicacion, usuario} = req.query;
    const elementosCarpetas = await carpertas.find(
        
        {
            ubicacion:ubicacion,
            usuarioAsociado: usuario
        }
        );
    if (elementosCarpetas) {
        res.json(elementosCarpetas);
    } else {
        res.json({error: "no se pudo procesar"});
    }
}


//copiar carpetas




module.exports = {
    creaCarpeta: creaCarpeta,
    obtenCarpetas: obtenCarpetas,
    obtenArchivosDirectorio: obtenArchivosDirectorio,
    obtenerCarpetasDirectorio: obtenerCarpetasDirectorio
}