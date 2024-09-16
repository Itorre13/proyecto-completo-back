import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { leerTareas,crearTarea,borrarTarea,actualizarTexto,actualizarEstado } from './db.js';

dotenv.config();

const servidor = express();

servidor.use(cors());

servidor.use(express.json());

if(process.env.TEST){  // si process.env.TEST existe
    servidor.use("/pruebas",express.static("./prueba")) // le decimos al servidor que queremos crear a partir de /pruebas express.static la carpeta. Si ponemos en localhost:3000/pruebas voy a acceder a lo que contenga el directorio estático ./prueba
}

servidor.get("/tareas", async (peticion,respuesta) => {
    try{
        let tareas = await leerTareas();
        respuesta.json(tareas);
    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en la base de datos"});
    }
});

servidor.post("/tareas/nueva", async (peticion,respuesta,siguiente) => {
    try{
        
        if(peticion.body.tarea && peticion.body.tarea.trim() != ""){
            let {tarea} = peticion.body;

            let id = await crearTarea(tarea);

            return respuesta.json({id});

        }

        siguiente("error");


    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en la base de datos"});
    }
});

servidor.delete("/tareas/borrar/:id([0-9a-f]{24})", async (peticion,respuesta) => {
    try{
        let cantidad = await borrarTarea(peticion.params.id);

        respuesta.json({ resultado : cantidad ? "ok" : "ko" });

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en la base de datos" });
    }
});

servidor.put("/tareas/actualizar/texto/:id([0-9a-f]{24})", async (peticion,respuesta,siguiente) => {
    try{

        if(peticion.body.tarea && peticion.body.tarea.trim() != ""){

            let {tarea} = peticion.body;
        
            let cantidad = await actualizarTexto(peticion.params.id,tarea);

        return respuesta.json({ resultado : cantidad ? "ok" : "ko" });

        }

        siguiente("error");

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en la base de datos" });
    }
});

servidor.put("/tareas/actualizar/estado/:id([0-9a-f]{24})", async (peticion,respuesta) => {
    try{    
        let cantidad = await actualizarEstado(peticion.params.id);

        respuesta.json({ resultado : cantidad ? "ok" : "ko" });

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en la base de datos" });
    }
});

servidor.use((error,peticion,respuesta,siguiente) => {
    respuesta.status(400);
    respuesta.json({ error : "error en la petición" });
});

servidor.use((peticion,respuesta) => {
    respuesta.status(404);
    respuesta.json({ error : "recurso no encontrado" });
});

servidor.listen(process.env.PORT); // en el puerto que he configurado en el fichero .env



