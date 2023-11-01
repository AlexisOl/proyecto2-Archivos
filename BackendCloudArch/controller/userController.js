const usuario = require('../models/user.js')



//funcion para ingreso de usuarios
const crearUsuario = async(req, res) => {
    console.log(req.body);

    const insertarUsuario = new usuario (
        {
            nombre: req.body.nombre,
            password: req.body.password,
            rol: req.body.rol
        }
    )

    const nuevoUsuario = await insertarUsuario.save();
    res.json(nuevoUsuario);
};


//funcion para obtener a los usuarios 
const obtenerUsuario = async(req, res) => {
    const {nombre, password} = req.query;


    console.log(nombre, password);
    const usuarioFinal = await usuario.findOne({
        nombre: nombre,
        password: password
    });
    if (usuarioFinal) {
        res.json(usuarioFinal);

    } else {
        res.json({error: "no se pudo encontrar"});

    }
};

//funcion para cambiar la contrsasenia
const cambioContrasenia = async(req, res) => {

};

module.exports = {
    crearUsuario: crearUsuario,
    obtenerUsuario:obtenerUsuario
}