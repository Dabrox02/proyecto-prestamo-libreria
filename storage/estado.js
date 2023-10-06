import crud from "../crud/crud.js";

const endpoint = `/estados`;
const primaryKey = {
    "estadoId": "number"
};
const interfaz = {
    "nombre": "string",
    "descripcion": "string",
}

const getAll = async () => {
    return await crud.getAll({ endpoint });
}

const getOne = async (id) => {
    return await crud.getOne({ endpoint, primaryKey, id });
}

const deleteOne = async (id) => {
    return await crud.deleteOne({ endpoint, primaryKey, id });
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
//     "nombre": "Demetrius Slater",
//     "descripcion": "quis accumsan convallis, ante lectus convallis est, vitae"
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "nombre": "Reese Marks",
//     "descripcion": "eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());