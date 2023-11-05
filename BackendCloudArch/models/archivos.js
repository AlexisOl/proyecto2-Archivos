const { Schema, model } = require ("mongoose");

//creacion del schema

const archivos = new Schema(
  {
    nombre: String,
    contenido:String,
    extension: String,
    ubicacion: String,
    usuario:String,
    cantidadCopiado:String,
    tipo:String,
    usuarioOriginal: String,
    fecha: String,
    hora: String
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("archivos", archivos);
