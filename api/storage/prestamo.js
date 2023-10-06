import crud from "../crud/crud.js";

const endpoint = `/prestamos`;
const primaryKey = {
    "prestamoId": "number"
};
const interfaz = {
    "usuarioId": "number",
    "libroId": "number",
    "fecha_prestamo": "date",
    "fecha_devolucion": "date",
    "estado": "string"
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

// * POST DE PRUEBA
// console.log(await post({
//     "id_usuario": 854,
//     "id_libro": 551,
//     "fecha_prestamo": "2024-02-01",
//     "fecha_devolucion": "2024-05-30",
//     "estado": "pharetra."
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "id_usuario": 920,
//     "id_libro": 3,
//     "fecha_prestamo": "2023-06-11",
//     "fecha_devolucion": "2023-08-08",
//     "estado": "dignissim"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());