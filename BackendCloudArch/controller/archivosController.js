const archivo = require("../models/archivos.js");
const carpertas = require("../models/carpertas.js");
const user = require("../models/user.js");

//funcion para ingreso de archiovs
const crearArchivo = async (req, res) => {
  console.log(req.body);

  const insertarArchivo = new archivo({
    nombre: req.body.nombre,
    contenido: req.body.contenido,
    extension: req.body.extension,
    ubicacion: req.body.ubicacion,
    usuario: req.body.usuario,
    tipo: "raiz",
  });

  const nuevoArchivo = await insertarArchivo.save();
  res.json(nuevoArchivo);
};

// funcion para obtener de archivos
const obtenerArchivos = async (req, res) => {
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
          extension: archivoEnviado.extension,
        },
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

//copiar archivo ------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

const copiarArchivo = async (req, res) => {
  const { archivoParaCopiar, ubicacion } = req.body;

  //agrega una nueva cantidad d ecopia
  let agregarCantidadCopia = archivoParaCopiar.cantidadCopiado;
  let cantidadCopiaFinal = 0;
  //verifica la cantidad de veces de copia
  if (agregarCantidadCopia == undefined) {
    cantidadCopiaFinal = 1;
  } else {
    cantidadCopiaFinal = 1 + parseInt(agregarCantidadCopia);
  }

  //genera el nuevo archivo a copiar

  const archivoCopiado = new archivo({
    nombre: archivoParaCopiar.nombre + "_" + String(cantidadCopiaFinal),
    contenido: archivoParaCopiar.contenido,
    extension: archivoParaCopiar.extension,
    ubicacion: ubicacion,
    usuario: archivoParaCopiar.usuario,
    cantidadCopiado: String(0),
    tipo: "raiz",
  });

  //actualiza el archivo que se habia usado como refenrencia de copia
  const actualizacionCopiasCantidadInicial = await archivo.updateOne(
    { _id: archivoParaCopiar._id },
    {
      $set: {
        cantidadCopiado: String(cantidadCopiaFinal),
      },
    },
    { new: true }
  );

  if (actualizacionCopiasCantidadInicial) {
    const archivoCopiadoPeticion = await archivoCopiado.save();

    if (archivoCopiadoPeticion) {
      console.log("cantidad veces" + agregarCantidadCopia);
      //  res.json(archivoCopiadoPeticion);
    } else {
      res.json({ error: "error no se puede" });
    }
  } else {
    res.json({ error: "no se pudo actualizar" });
  }
};
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
const eliminarArchivo = async (req, res) => {
  const archivoEliminar = JSON.parse(req.query.archivoEliminar[1]);
  console.log(archivoEliminar._id, archivoEliminar.nombre);

  //busca el archivo en base al id
  //ahora solo modificarlo
  const mandarAPapelera = await archivo.updateOne(
    { _id: archivoEliminar._id },
    {
      $set: {
        tipo: "Papelera",
      },
    },
    { new: true }
  );

  if (mandarAPapelera) {
    console.log(mandarAPapelera);
  } else {
    res.json({
      error: "no se pudo eliminar",
    });
  }
};

///// PARA VER ARCHIVOS EN PAPELERA
const verPapeleraGeneral = async (req, res) => {
  const { papelera, ubicacion } = req.query;

  const peticionPapelera = await archivo.find({
    tipo: papelera,
    ubicacion: ubicacion,
  });

  if (peticionPapelera) {
    res.json(peticionPapelera);
  } else {
    res.json({ error: "no se pudo procesar" });
  }
};

//funcion para poder mover los archivos de carpeta
// para mover si hay algo del mismo nombre no se puede
const moverArchivo = async (req, res) => {
  const { ubicacion, archivos } = req.body;
  //buscamos si ya hay archivos con el mismo nombre
  const verElementos = await archivo.find({
    ubicacion: ubicacion,
    nombre: archivos.nombre,
  });

  //generar la modificacion
  if (verElementos.length < 1) {
    try {
      const peticionMover = await archivo.updateOne(
        { _id: archivos._id },
        {
          $set: {
            ubicacion: ubicacion,
          },
        },
        { new: true }
      );

      if (peticionMover) {
        res.json(peticionMover);
      } else {
        res.json({ error: "no se pudo " });
      }
    } catch (error) {
      res.json({ error: error });
    }
  }
};

//funcion para buscar un archivo en base a una expresion
const buscarDirectorioParcial = async (req, res) => {
  const { ubicacion } = req.query;
  console.log(ubicacion);

  const peticionBuscar = carpertas
    .find(
      { ubicacion: new RegExp(ubicacion) },
      { ubicacion: 1, _id: 0, nombre: 1 }
    )
    .sort({ ubicacion: 1 });
  let arrayElementos = [];
  let valorInicialMasCercano =0;
  let nuevaUbicacion = "";
  (await peticionBuscar).forEach((elementos) => {

    if(valorInicialMasCercano ===0) {
       nuevaUbicacion = elementos.ubicacion;
    }
    console.log("jala?", elementos);

    arrayElementos.push(elementos.ubicacion+elementos.nombre+"/");
    valorInicialMasCercano++;

  });
  arrayElementos.push(nuevaUbicacion);
  console.log(arrayElementos);

  const arraySinRepetir = arrayElementos.filter((valor, indice, arreglo) => {
    return arreglo.indexOf(valor) === indice;
  });

  if (arraySinRepetir) {
    const arrayValores = Object.values(arraySinRepetir);
    console.log(arrayValores);

    res.json({ arrayValores });
  } else {
    res.json({ error: "error no se pudo" });
  }
};

//funcion para compartir archivos
const compartirArchivos = async (req, res) => {
  const {nombre,archivosPeticion } = req.body;
  const now = new Date(); 
  const hours = now.getHours(); 
  const minutes = now.getMinutes(); 
  const seconds = now.getSeconds(); 
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const buscarUsuario = await user.findOne({nombre: nombre});

  if(buscarUsuario) {
    const insertarArchivo = new archivo({
      nombre: archivosPeticion.nombre,
      contenido: archivosPeticion.contenido,
      extension: archivosPeticion.extension,
      ubicacion: "compatido/",
      usuario: nombre,
      tipo: "compartido",
      usuarioOriginal: archivosPeticion.usuario,
      fecha: now,
      hora: formattedTime
    });
  
    const nuevoArchivo = await insertarArchivo.save();
    res.json(nuevoArchivo);
  }
}


module.exports = {
  crearArchivo: crearArchivo,
  obtenerArchivos: obtenerArchivos,
  editarArchivos: editarArchivos,
  copiarArchivo: copiarArchivo,
  eliminarArchivo: eliminarArchivo,
  verPapeleraGeneral: verPapeleraGeneral,
  moverArchivo: moverArchivo,
  buscarDirectorioParcial: buscarDirectorioParcial,
  compartirArchivos:compartirArchivos
};
