const { Schema, model } = require ("mongoose");

//creacion del schema

const prueba = new Schema(
  {
    nombre: String,
    password: String,
    rol: Number
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("Prueba", prueba);
