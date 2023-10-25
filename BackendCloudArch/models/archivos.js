const { Schema, model } = require ("mongoose");

//creacion del schema

const archivos = new Schema(
  {
    nombre: String,
    contenido:string,
    extension: string
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("archivos", archivos);
