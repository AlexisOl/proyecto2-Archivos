const {Schema, model} = require('mongoose');

//creacion del schema

const carpetas = new Schema(
    {
      nombre: String,
      tipo: String,
      usuarioAsociado: String,
      ubicacion: String,
      cantidadArchivos: [{
        archivos: String
    }]
    },
    {
      timestamps: false,
      versionKey: false
    }
  );
  
  module.exports = model("Carpetas", carpetas);