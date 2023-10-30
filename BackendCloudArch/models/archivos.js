const { Schema, model } = require ("mongoose");

//creacion del schema

const archivos = new Schema(
  {
    nombre: String,
    contenido:String,
    extension: String,
    ubicacion: String,
    usuario:String
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("archivos", archivos);
