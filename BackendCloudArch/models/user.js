const { Schema, model } = require ("mongoose");

//creacion del schema

const usuarios = new Schema(
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

module.exports = model("usuarios", usuarios);
