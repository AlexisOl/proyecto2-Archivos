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
    const {usuarios, nuevaPassword} =req.body;
    // ya con la info busco y actualizo 
    try {
        const peticionActualizacion = await usuario.findByIdAndUpdate({_id: usuarios._id}, 
            {
                password: nuevaPassword
            })        
        if(peticionActualizacion) {
            res.json(peticionActualizacion)
        } else {
            res.json({error: "no se pudo"})
        }
    }catch(error) {
        res.json({error: `error ${error}` })
    }

};

//funcion para crear nuevos empleadores 
const crearTrabajadores= async(req, res) => {
    const {nombre, password, rol} = req.body;
    console.log(req.body.generarNuevoUser);
    console.log(nombre);

    if (req.body) {
        try {
            const peticionNuevo = new usuario (
                {nombre: nombre,
                password: password,
                rol: rol}
        )         
        const generarPeticion = await peticionNuevo.save();
        if(generarPeticion) {
            res.json(nuevoUsuario);
        } else {
            res.json({error: "no se pudo"})
        }
        } catch(error) {
         res.json({error: `error ${error}` })
        }
    }

};


module.exports = {
    crearUsuario: crearUsuario,
    obtenerUsuario:obtenerUsuario,
    cambioContrasenia: cambioContrasenia,
    crearTrabajadores: crearTrabajadores
}