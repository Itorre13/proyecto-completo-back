import dotenv from 'dotenv';
import{MongoClient, ObjectId} from 'mongodb';

dotenv.config();

function conectar(){
    return MongoClient.connect(process.env.MONGO_URL);
}

export function leerTareas(){
    return new Promise(async (ok,ko) => {
        try{
            const conexion = await conectar();

            const coleccion = conexion.db("tareas").collection("tareas");

            let tareas = await coleccion.find({}).toArray();

            conexion.close();

            ok(tareas.map(({_id,tarea,terminada}) => {
                return { id : _id, tarea, terminada }
            }));

        }catch(error){
            ko({ error : "error en la base de datos"});
        }
    });
}

/* PRUEBA leerTareas()
leerTareas()
.then(x => console.log(x))
.catch(x => console.log(x));
*/
 

export function crearTarea(texto){
    return new Promise(async (ok,ko) => {
        try{
            const conexion = await conectar();

            const coleccion = conexion.db("tareas").collection("tareas");

            let {insertedId} = await coleccion.insertOne({ tarea : texto, terminada : false });

            conexion.close();

            ok(insertedId);

        }catch(error){
            ko({ error : "error en la base de datos"});
        }
    });
}

/* PRUEBA crearTarea()
crearTarea("Otra tarea nueva...probando crearTarea")
.then(x => console.log(x))
.catch(x => console.log(x));
*/

export function borrarTarea(id){
    return new Promise(async (ok,ko) => {
        try{
            const conexion = await conectar();

            const coleccion = conexion.db("tareas").collection("tareas");

            let {deletedCount} = await coleccion.deleteOne({ _id : new ObjectId(id) });

            conexion.close();

            ok(deletedCount);

        }catch(error){
            ko({ error : "error en la base de datos"});
        }
    });
}

/* PRUEBA borrarTarea()
borrarTarea('66e699ab99df372c10f519e2')
.then(x => console.log(x))
.catch(x => console.log(x));
 */

export function actualizarTexto(id,texto){
    return new Promise(async (ok,ko) => {
        try{
            const conexion = await conectar();

            const coleccion = conexion.db("tareas").collection("tareas");

            let {modifiedCount} = await coleccion.updateOne({ _id : new ObjectId(id) }, { $set : { tarea : texto }});

            conexion.close();

            ok(modifiedCount);

        }catch(error){
            ko({ error : "error en la base de datos"});
        }
    });
}

/* PRUEBA actualizarTexto()
actualizarTexto('66e6998912256b927c657b6c', "blo blo blo")
.then(x => console.log(x))
.catch(x => console.log(x));
 */

export function actualizarEstado(id){
    return new Promise(async (ok,ko) => {
        try{
            const conexion = await conectar();

            const coleccion = conexion.db("tareas").collection("tareas");

            let {terminada} = await coleccion.findOne({ _id : new ObjectId(id) });

            let {modifiedCount} = await coleccion.updateOne({ _id : new ObjectId(id) }, { $set : { terminada : !terminada }});

            conexion.close();

            ok(modifiedCount);

        }catch(error){
            ko({ error : "error en la base de datos"});
        }
    });
}

/* PRUEBA actualizarEstado()
actualizarEstado('66e6998912256b927c657b6c')
.then(x => console.log(x))
.catch(x => console.log(x));
 */


/* PRUEBA leerTareas()
leerTareas()
.then(x => console.log(x))
.catch(x => console.log(x));
*/




