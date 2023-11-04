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
        //busca ubicacion, usuario y tipo de archivo
    const archivosCarpeta = await archivos.find({ubicacion:ubicacion, usuario:usuario, tipo:"raiz"});
    if (archivosCarpeta) {
        console.log(archivosCarpeta);
        res.json(archivosCarpeta);

    } else {
        res.json({error: "no se pudo encontrar"});

    }

};

//funcion para obtener carpetas en base a directoio y usuario Y TIPO
const obtenerCarpetasDirectorio= async (req, res) => {
    const {ubicacion, usuario} = req.query;
    const elementosCarpetas = await carpertas.find(
        
        {
            ubicacion:ubicacion,
            usuarioAsociado: usuario,
            tipo:"raiz"
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
                        cantidadCopiado: String(0),
                        tipo:"raiz"
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
async function procesoParaCopiarArchivosDirectorios(archivosTotales,ubicacionInicialPartida, ubicaciones,
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

    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
//FUNCION PARA ELIMINAR CARPETAS Y TODOS LOS ARCHIVOS DENTROA

const eliminarCarpetas= async(req, res) => {
    console.log(JSON.parse(req.query.carpetaEliminar[1]));
    console.log(req.query);
    const carpetaEliminar=JSON.parse(req.query.carpetaEliminar[1])
    //directorio desde donde debe de empezar las demas carpetas y archivos;
    let directorioParaDemasArchivos = carpetaEliminar.ubicacion+carpetaEliminar.nombre+"/";
    let archivosNuevos =[];
    let carpetasNuevas = [];

    let ubicacionesArchivos=[];
    let ubicacionesCarpetas = [];

    let ubicacionInicialPartida = directorioParaDemasArchivos.split("/");
    
    // traer todos los otras archivos 
    const archivosTotales = await archivos.find({tipo: "raiz"});
    //traer todas las carpetas
    const carpetasTotales = await carpertas.find({tipo: "raiz"});
    //actualizacion de carpeta princial
    const eliminarCarpetas = await carpertas.updateOne(
        { _id: carpetaEliminar._id },
        {
            $set: {
                tipo: "Papelera",
                ubicacion:"papelera/"
            }
        },
        { new: true }
    );

    if (eliminarCarpetas) {

    } else {
        res.json({error:"no se puede eliminar"})
    }
    //llamo a las funciones
    procesoParaEliminarArchivosDirectorios(archivosTotales,ubicacionInicialPartida,archivosNuevos,ubicacionesArchivos);
    procesoParaEliminarCarpetasDirectorios(carpetasTotales,ubicacionInicialPartida,carpetasNuevas,ubicacionesCarpetas);
    //solo para ver
    console.log(archivosNuevos);
    console.log(ubicacionesArchivos);
    console.log(carpetasNuevas);
    console.log(ubicacionesCarpetas);

    //actualizar cada archivo y carpeta
    // ----- PARA LOS ARCHIVOS
for (let i = 0; i < archivosNuevos.length; i++) {
    try {
        const nuevoArchivo = archivosNuevos[i];
        const eliminarIndividualmenteArchivos = await archivos.updateOne(
            { _id: nuevoArchivo._id },
            {
                $set: {
                    tipo: "Papelera",
                    ubicacion: ubicacionesArchivos[i],
                },
            },
            { new: true }
        );
        if (!eliminarIndividualmenteArchivos) {
            return res.json({ error: "no se puede modificar" });
        }
    } catch (error) {
        return res.json({ error: error });
    }
}

//-------- PARA LAS CARPETAS
for (let i = 0; i < carpetasNuevas.length; i++) {
    try {
        const nuevaCarpeta = carpetasNuevas[i];
        const eliminarIndividualmenteCarpetas = await carpertas.updateOne(
            { _id: nuevaCarpeta._id },
            {
                $set: {
                    tipo: "Papelera",
                    ubicacion: ubicacionesCarpetas[i],
                },
            },
            { new: true }
        );
        if (!eliminarIndividualmenteCarpetas) {
            return res.json({ error: "no se puede modificar" });
        }
    } catch (error) {
        return res.json({ error: error });
    }
}

};

// funcion de como obtengo cada archivo
async function procesoParaEliminarArchivosDirectorios(archivosTotales,ubicacionInicialPartida, ubicaciones,
     ubicacionesActulizadasArchivos) {
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
                    }
                
                }
            }

            if (cantidadContada === ubicacionInicialPartida.length-1) {
                let nuevoValor ="papelera/";

                ubicaciones.push(archivoEspecifico);
                console.log(parteModificadaDirectorio+"**************");
                console.log(nuevoDirectorio+"------------------------------------------------");
                let prueba = archivoEspecifico.ubicacion.split(parteModificadaDirectorio)
                console.log("a ver si jala"+prueba);
                // SOLO QUEDA UNIR DIRECTORIOS NUEVOS
                let directorioModificadoUnificado = nuevoValor+prueba[1];
                console.log("actualizado*************** "+directorioModificadoUnificado);
                ubicacionesActulizadasArchivos.push(directorioModificadoUnificado);
            }
        }
    )
}

async function procesoParaEliminarCarpetasDirectorios(carpetasTotales, ubicacionInicialPartida, ubicaciones,
    ubicacionesActulizadasCarpetas) {
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
                      }
                }
            }

            if (cantidadContada === ubicacionInicialPartida.length-1) {
                let nuevoValor ="papelera/";

                ubicaciones.push(carpetasEspecificas);
                console.log(carpetasTotales+"++++++++++++++++++++++++++++++");
                console.log(carpetasTotales+"++++++++++++++++++++++++++++++");
                let prueba = carpetasEspecificas.ubicacion.split(parteModificadaDirectorio)
                // SOLO QUEDA UNIR DIRECTORIOS NUEVOS
                let directorioModificadoUnificado = nuevoValor+prueba[1];
                console.log("actualizado+++++++++++++++++++ "+directorioModificadoUnificado);
                ubicacionesActulizadasCarpetas.push(directorioModificadoUnificado);
            }
        }
    )
}

/// funcion para ver carpetas eliminadas

const verCarpetasEliminadas = async(req, res) => {
    const {papelera, ubicacion} = req.query;

    const peticionCarpetas = await carpertas.find({tipo:papelera, ubicacion:ubicacion});

    if(peticionCarpetas) {
        res.json(peticionCarpetas);
      } else {
        res.json({error: "no se pudo procesar"})
      }

};

//funcion para mover carpetas y todos sus archivos 
const moverCarpeta = async (req, res) => {
    const { ubicacion, carpetaMover } = req.body;
    console.log(carpetaMover);
    console.log(ubicacion);

    let archivosObtenidos =[];
    let carpetasObtenidas = [];
    let ubicacionesArchivosActualizadas = [];
    let ubicacionesCarpetasActualizadas = [];
    //genracion general de la ubicacion
    let directorioParaDemasArchivos = carpetaMover.ubicacion+carpetaMover.nombre+"/";
    let ubicacionInicialPartida = directorioParaDemasArchivos.split("/");
    // actualizacion de la carpeta general 
    try {
        const peticionActualizacionOriginal = await carpertas.updateOne(
            {_id: carpetaMover._id},
            {
                ubicacion: ubicacion
            }
        )
        console.log(peticionActualizacionOriginal);
        if (peticionActualizacionOriginal) {

        } else {
            res.json({error:"error no se pudo"})
        }

    } catch (error) {
        res.json({error:`error no se pudo ${error}` })

    }

    //obtengo cada una de las ubicaciones nuevas
    const archivosInicial = await archivos.find({tipo: "raiz"});
    const carperasInicial = await carpertas.find({tipo: "raiz"})

    obtenerArchivosUbicacionesModificadas(archivosInicial,ubicacionInicialPartida, archivosObtenidos,ubicacionesArchivosActualizadas, ubicacion);
    obtenerCarpetasUbicacionesModificadas(carperasInicial, ubicacionInicialPartida, carpetasObtenidas, ubicacionesCarpetasActualizadas,ubicacion);
    //solo para ver
    console.log(archivosObtenidos);
    console.log(carpetasObtenidas);
    console.log(ubicacionesArchivosActualizadas);
    console.log(ubicacionesCarpetasActualizadas);
    //ahora solo actualizo cada archivo y carpeta
    //-----------------------------------------------------
    //-----------------------------------------------------
    //------------ARCHIVOS----------------
    //-----------------------------------------------------
    let contadorArchivoElementos =0;
    for (let i = 0; i < archivosObtenidos.length; i++) {
        try {
            const archivoIndividual = archivosObtenidos[i];
            console.log(
                "solo para ver " +
                    archivoIndividual.nombre +
                    "++++++" +
                    ubicacionesArchivosActualizadas[i] +
                    "contador" +
                    i
            );
    
            const actualizarArchivo = await archivos.updateOne(
                { _id: archivoIndividual._id },
                {
                    $set: {
                        ubicacion: ubicacionesArchivosActualizadas[i],
                    },
                },
                { new: true }
            );
            if (!actualizarArchivo) {
                return res.json({ error: "no se puede modificar" });
            } else {
                contadorArchivoElementos++;
            }
        } catch (error) {
            res.json(error);
        }
    }
    
  //-----------------------------------------------------
    //-----------------------------------------------------
    //------------Carpetas----------------
    //-----------------------------------------------------
    let contadorCarpetaElementos =0;
    for (let i = 0; i < carpetasObtenidas.length; i++) {
        try {
            const carpetaIndividual = carpetasObtenidas[i];
            console.log(
                "solo para ver " +
                    carpetaIndividual.nombre +
                    "++++++" +
                    ubicacionesCarpetasActualizadas[i]
            );
            const actualizarCarpeta = await carpertas.updateOne(
                { _id: carpetaIndividual._id },
                {
                    $set: {
                        ubicacion: ubicacionesCarpetasActualizadas[i],
                    },
                },
                { new: true }
            );
            if (!actualizarCarpeta) {
                return res.json({ error: "no se puede modificar" });
            }
        } catch (error) {
            res.json(error);
        }
        contadorCarpetaElementos++;
    }
    

};


//FUNCIONES DE FORMA ASINCRONA PARA CADA ELEMENTOS 
async function obtenerArchivosUbicacionesModificadas(archivosTotales,ubicacionInicialPartida, ubicaciones,
    ubicacionesActulizadasArchivos, nuevaUbicacion) {
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
                   }
               
               }
           }

           if (cantidadContada === ubicacionInicialPartida.length-1) {

               ubicaciones.push(archivoEspecifico);
               console.log(parteModificadaDirectorio+"**************");
               console.log(nuevoDirectorio+"------------------------------------------------");
               let prueba = archivoEspecifico.ubicacion.split(parteModificadaDirectorio)
               console.log("a ver si jala"+prueba);
               // SOLO QUEDA UNIR DIRECTORIOS NUEVOS
               let directorioModificadoUnificado = nuevaUbicacion+prueba[1];
               console.log("actualizado*************** "+directorioModificadoUnificado);
               ubicacionesActulizadasArchivos.push(directorioModificadoUnificado);
           }
       }
   )
}

async function obtenerCarpetasUbicacionesModificadas(carpetasTotales, ubicacionInicialPartida, ubicaciones,
    ubicacionesActulizadasCarpetas, nuevaUbicacion) {
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
                      }
                }
            }

            if (cantidadContada === ubicacionInicialPartida.length-1) {
                ubicaciones.push(carpetasEspecificas);
                console.log(carpetasTotales+"++++++++++++++++++++++++++++++");
                console.log(carpetasTotales+"++++++++++++++++++++++++++++++");
                let prueba = carpetasEspecificas.ubicacion.split(parteModificadaDirectorio)
                // SOLO QUEDA UNIR DIRECTORIOS NUEVOS
                let directorioModificadoUnificado = nuevaUbicacion+prueba[1];
                console.log("actualizado+++++++++++++++++++ "+directorioModificadoUnificado);
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
    copiarCarpetas:copiarCarpetas,
    eliminarCarpetas:eliminarCarpetas,
    verCarpetasEliminadas: verCarpetasEliminadas,
    moverCarpeta: moverCarpeta
}