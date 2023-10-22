const usuario = require('../models/user.js')



//funcion para ingreso de usuarios
const crearUsuario = async(req, res) => {
    console.log(req.body);

    const insertarUsuario = new usuario (
        {
            nombre: req.body.nombre,
            password: req.body.password
        }
    )

    const nuevoUsuario = await insertarUsuario.save();
    res.json(nuevoUsuario);
};


//funcion para obtener a los usuarios 
const obtenerUsuario = async(req, res) => {
    const usuarioFinal = await usuario.find();
    res.json(usuarioFinal);
}

module.exports = {
    crearUsuario: crearUsuario,
    obtenerUsuario:obtenerUsuario
}