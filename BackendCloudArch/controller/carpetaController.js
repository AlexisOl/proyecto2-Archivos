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
const copiarCarpetas = async(req,res) => {
    const {carpetaParaCopiar, ubicacion} = req.body;
    let ubicaciones = [];
    let ubicacionesCarpetas = [];
    let ubicacionesActulizadasArchivos = [];
    let ubicacionesActulizadasCarpetas = [];

    //ahora obtenemos la cantidad de veces copiados
    let agregarCantidadCopia = carpetaParaCopiar.cantidadCopiados;
    console.log(agregarCantidadCopia+"......");
    let cantidadCopiaFinal = 0;
    if (agregarCantidadCopia === undefined) {
        cantidadCopiaFinal = 1;
    } else {
        cantidadCopiaFinal = 1 + parseInt(agregarCantidadCopia);
    }


    //ahora primero obtenemos todos los archivos con ese directorio
    // o menores


    let ubicacionInicial = ubicacion+carpetaParaCopiar.nombre+"/";
    console.log("ubicacion de carpeta pero ahi mismo ", ubicacionInicial);

    let ubicacionInicialPartida = ubicacionInicial.split("/");
    
    // traer todos los otras archivos 
    const archivosTotales = await archivos.find();
    //traer todas las carpetas
    const carpetasTotales = await carpertas.find();

    procesoParaCopiarArchivosDirectorios(archivosTotales,ubicacionInicialPartida,  ubicaciones,cantidadCopiaFinal, ubicacionesActulizadasArchivos);
    procesoParaCopiarCarpetasDirectorios(carpetasTotales, ubicacionInicialPartida,  ubicacionesCarpetas, cantidadCopiaFinal, ubicacionesActulizadasCarpetas)

    console.log(ubicaciones);
    console.log(ubicacionesCarpetas);
    console.log(ubicacionesActulizadasArchivos);
    console.log(ubicacionesActulizadasCarpetas);
    //AHORA OBTENGO TODAS LAS CARPETAS

    
    //ahora generamos la nuevaCarpeta
    const insertarCarpetaCopiada = new carpertas (
        {
            nombre: carpetaParaCopiar.nombre+"_"+String(cantidadCopiaFinal),
            tipo: carpetaParaCopiar.tipo,
            usuarioAsociado: carpetaParaCopiar.usuarioAsociado,
            ubicacion: carpetaParaCopiar.ubicacion,
            cantidadCopiados: String(0),
            archivos : carpetaParaCopiar.archivos
        }
    );
    //modificamos la que copiamos originalemente

    const actualizacionCopiasCantidadInicialCarpeta = await carpertas.updateOne(
        { _id: carpetaParaCopiar._id },
        {
            $set: {
                cantidadCopiados: String(cantidadCopiaFinal)
            }
        },
        { new: true }
    );



    //actualiza y crea los archivos
    if(actualizacionCopiasCantidadInicialCarpeta) {
        const peticionCarpetaCopiada = await insertarCarpetaCopiada.save();
         if(peticionCarpetaCopiada) {
            console.log("cantidad veces" + agregarCantidadCopia);

         } else {
            res.json({ error: "error no se puede" })

         }
    } else {
        res.json({ error: "no se pudo actualizar" })

    }
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------

    //despues de crear la carpeta creamos a todos los elementos dentro
    // archivos y carpetas

    //----------------
    //----ARCHIVOS----
    //----------------
    let cambioDirectorioLista =0;
    ubicaciones.forEach(
        (archivosParaCrear) => {
            const crearArchivoNuevo = new archivos (
                    {
                        nombre: archivosParaCrear.nombre,
                        contenido: archivosParaCrear.contenido,
                        extension: archivosParaCrear.extension,
                        ubicacion: ubicacionesActulizadasArchivos[cambioDirectorioLista],
                        usuario: archivosParaCrear.usuario,
                        cantidadCopiado: String(0)
                    }
                );
            cambioDirectorioLista++;
           const peticionIndividualArchivos = crearArchivoNuevo.save();
            if(peticionIndividualArchivos) {
                console.log("EXITO" + crearArchivoNuevo);
    
             } else {
                res.json({ error: "error no se puede" })
    
             }
        }
    )


    //----------------
    //----------------
    //--- CARPETAS----
    //----------------
    let cambioDirectorioListaCarpeta =0;
    ubicacionesCarpetas.forEach(
        (carpetasNuevas) => {
            const crearCarpetaNueva = new carpertas (
                {
                    nombre: carpetasNuevas.nombre,
                    tipo: carpetasNuevas.tipo,
                    usuarioAsociado: carpetasNuevas.usuarioAsociado,
                    ubicacion: ubicacionesActulizadasCarpetas[cambioDirectorioListaCarpeta],
                    cantidadCopiados: String(0),
                    archivos : carpetasNuevas.archivos
                }
            );
            cambioDirectorioListaCarpeta++;
           const peticionIndividualCarpetas = crearCarpetaNueva.save();
            if(peticionIndividualCarpetas) {
                console.log("EXITO2" + peticionIndividualCarpetas);
    
             } else {
                res.json({ error: "error no se puede" })
    
             }
        }
    )
  




};
    //----------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------

// funcion de como obtengo cada archivo
async function procesoParaCopiarArchivosDirectorios(archivosTotales,ubicacionInicialPartida,  ubicaciones,
    cantidadCopiaFinal, ubicacionesActulizadasArchivos) {
    archivosTotales.forEach(
        
        (archivoEspecifico) => {
            let nuevoDirectorio = "";
            let parteModificadaDirectorio = "";
            let archivoEspecificoPartido = archivoEspecifico.ubicacion.split("/");
            // inicio de contador para verificar que si cumple con todos los nombres de carpetas
            let cantidadContada = 0;
            //ciclo para verificar cada elemento
            for (i =0; i < ubicacionInicialPartida.length-1 ; i++) {
                console.log(ubicacionInicialPartida[i]+"-------"+archivoEspecificoPartido[i]);
                if (ubicacionInicialPartida[i] === archivoEspecificoPartido[i]) {
                    cantidadContada++;
                    // este es para la parte despues
                    nuevoDirectorio += ubicacionInicialPartida[i]+"/";
                    //este es par el cambio
                    if (i < ubicacionInicialPartida.length-2) {
                        parteModificadaDirectorio += ubicacionInicialPartida[i]+"/";
                    } else {
                        parteModificadaDirectorio += ubicacionInicialPartida[i]+"_"+String(cantidadCopiaFinal)+"/";

                        
                    }
                
                }
            }

            if (cantidadContada === ubicacionInicialPartida.length-1) {
                ubicaciones.push(archivoEspecifico);
                console.log(parteModificadaDirectorio+"**************");
                let prueba = archivoEspecifico.ubicacion.split(nuevoDirectorio)
                // SOLO QUEDA UNIR DIRECTORIOS NUEVOS
                let directorioModificadoUnificado = parteModificadaDirectorio+prueba[1];
                console.log("actualizado*************** "+directorioModificadoUnificado);
                ubicacionesActulizadasArchivos.push(directorioModificadoUnificado);
            }
        }
    )
}

async function procesoParaCopiarCarpetasDirectorios(carpetasTotales, ubicacionInicialPartida, ubicaciones,
    cantidadCopiaFinal, ubicacionesActulizadasCarpetas) {
    carpetasTotales.forEach(
        (carpetasEspecificas) => {
            let nuevoDirectorio = "";
            let parteModificadaDirectorio = "";

            let carpetaEspecificaPartida = carpetasEspecificas.ubicacion.split("/");
            let cantidadContada =0;

            //ciclo para verificar
            for (i =0; i < ubicacionInicialPartida.length-1 ; i++) {
                console.log(ubicacionInicialPartida[i]+"-------"+carpetaEspecificaPartida[i]);
                if (ubicacionInicialPartida[i] === carpetaEspecificaPartida[i]) {
                    cantidadContada++;
                      // este es para la parte despues
                      nuevoDirectorio += ubicacionInicialPartida[i]+"/";
                      //este es par el cambio
                      if (i < ubicacionInicialPartida.length-2) {
                          parteModificadaDirectorio += ubicacionInicialPartida[i]+"/";
                      } else {
                          parteModificadaDirectorio += ubicacionInicialPartida[i]+"_"+String(cantidadCopiaFinal)+"/";
                      }
                }
            }

            if (cantidadContada === ubicacionInicialPartida.length-1) {
                ubicaciones.push(carpetasEspecificas);
                console.log(parteModificadaDirectorio+"**************");
                let prueba = carpetasEspecificas.ubicacion.split(nuevoDirectorio)
                // SOLO QUEDA UNIR DIRECTORIOS NUEVOS
                let directorioModificadoUnificado = parteModificadaDirectorio+prueba[1];
                console.log("actualizado*************** "+directorioModificadoUnificado);
                ubicacionesActulizadasCarpetas.push(directorioModificadoUnificado);
            }
        }
    )
}




module.exports = {
    creaCarpeta: creaCarpeta,
    obtenCarpetas: obtenCarpetas,
    obtenArchivosDirectorio: obtenArchivosDirectorio,
    obtenerCarpetasDirectorio: obtenerCarpetasDirectorio,
    copiarCarpetas:copiarCarpetas
}