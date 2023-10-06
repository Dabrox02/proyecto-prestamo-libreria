import crud from "../crud/crud.js";

const endpoint = `/autores`;
const primaryKey = {
    "autoreId": "number"
};
const interfaz = {
    "nombre": "string",
    "apellido": "string",
    "nacionalidad": "string"
};

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
//     "nombre": "Jonah",
//     "apellido": "Ewing",
//     "nacionalidad": "español"
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "nombre": "Reagan",
//     "apellido": "Armstrong",
//     "nacionalidad": "venezolano"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());
// console.log(await getOne(1));