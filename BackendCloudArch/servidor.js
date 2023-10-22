const express = require('express');
const cors = require('cors');
const usersRoutes = require('./router/login.routes.js');
const mongoose = require('mongoose')
//inicion de servidor
const servidor = express();

// para cors (por seguridad)
servidor.use(cors());
//conexion con la base de datos


async function conexionDB() {
    try {
        const database = await mongoose.connect('mongodb://localhost:27017/biblioteca', {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            family:4
        });
        console.log('conectado', database.connection.name, database.connection.collections);
    } catch(error) {
        console.log(error);
    }
}

//inicio de la conexion
conexionDB();

const prueba2 = async (req,res)=>{
    console.log(req.body.cui);
    const busqueda = await Categorias.find();   
        console.log(busqueda);
        res.json(busqueda);
    
}
//envio de json
servidor.use(express.json());
//rutas
servidor.use('/api', usersRoutes.rutas)
// puerto
const puerto = process.env.PORT || 8080;


servidor.listen( puerto, () => {
    console.log(`servidor en ${puerto}`);
}

)