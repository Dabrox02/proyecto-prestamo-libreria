import crud from "../crud/crud.js";

const endpoint = `/usuarios`;
const primaryKey = {
    "usuarioId": "number"
};
const interfaz = {
    "nombre": "string",
    "apellido": "string",
    "direccion": "string",
    "telefono": "string",
    "email": "string"
}

const getAll = async () => {
    return await crud.getAll({ endpoint });
}

const getOne = async (id) => {
    return await crud.getOne({ endpoint, primaryKey, id });
}

const deleteOne = async (id) => {
    return await crud.deleteOne({ endpoint, id });
}

const post = async (obj = {}) => {
    return await crud.post({ endpoint, interfaz, obj });
}

const putOne = async (obj = {}) => {
    return await crud.putOne({ endpoint, primaryKey, interfaz, obj });
}

export default {
    getAll,
    getOne,
    post,
    putOne,
    deleteOne
}

// * POST DE PRUEBA
// console.log(await post({
//     "nombre": "Olga",
//     "apellido": "Salinas",
//     "direccion": "Ap #742-8527 Orci. Ave",
//     "telefono": "1-324-613-2946",
//     "email": "nunc.pulvinar@icloud.couk"
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "nombre": "Jonah",
//     "apellido": "Ewing",
//     "direccion": "706-9440 Donec St.",
//     "telefono": "144-5237",
//     "email": "quis@outlook.net"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());