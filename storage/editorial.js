import crud from "../crud/crud.js";

const endpoint = `/editoriales`;
const primaryKey = {
    "editorialeId": "number"
};
const interfaz = {
    "nombre": "string",
    "direccion": "string",
    "telefono": "string"
};

const getAll = async () => {
    return await crud.getAll({ endpoint });
}

const getOne = async (id) => {
    return await crud.getOne({ endpoint, primaryKey, id });
}

const getAllDetails = async () => {
    return await crud.getAllDetails({ endpoint });
}

const getOneDetails = async (id) => {
    return await crud.getOneDetails({ endpoint, primaryKey, id });
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
    getAllDetails,
    getOneDetails,
    post,
    putOne,
    deleteOne
}

// * POST DE PRUEBA
// console.log(await post({
//     "nombre": "cielo azul",
//     "direccion": "P.O. Box 101, 5321 Sem Rd.",
//     "telefono": "31541654"
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "nombre": "Demetrius Slater",
//     "direccion": "Ap #152-812 Sapien, Rd.",
//     "telefono": "704-1101"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());