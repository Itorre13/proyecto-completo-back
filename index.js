import express from 'express';
import { config } from 'dotenv';
// import cors from 'cors';
// import { leerTareas } from './db.js';

const servidor = express();

config();

/*
servidor.use(cors());
servidor.use(express.json());

servidor.get("/", async (peticion,respuesta) => {
    try{
        let tareas = await leerTareas();
        respuesta.json(tareas)
    }catch(error){
        respuesta.status(500);
        respuesta.json(error);
    }
});
*/

if(process.env.TEST){  // si process.env.TEST existe
    servidor.use("/pruebas",express.static("./prueba")) // le decimos al servidor que queremos crear a partir de /pruebas express.static la carpeta. Si ponemos en localhost:3000/pruebas voy a acceder a lo que contenga el directorio estático ./prueba
}

servidor.listen(process.env.PORT); // en el puerto que he configurado en el fichero .env