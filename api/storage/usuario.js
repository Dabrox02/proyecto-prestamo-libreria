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