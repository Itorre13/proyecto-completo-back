import{MongoClient, ObjectId} from 'mongodb';

const url = "mongodb+srv://itorre13:mongoItorre31@prueba.f6rn9.mongodb.net/";

function conectar(){
    return MongoClient.connect(url);
};

export function leerTareas(){
    return new Promise(async (ok,ko) => {
        try{
            const conexion = await conectar();

            const coleccion = conexion.db("tareas").collection("tareas");

            let tareas = await coleccion.find({}).toArray();

            ok(tareas.map(({_id,tarea}) =>{
                let id = _id;
                return {id,tarea};
            }));

        }catch(error){
            ko({ error : "error en la base de datos"});
        }
    });
}