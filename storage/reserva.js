import crud from "../crud/crud.js";

const endpoint = `/reservas`;
const primaryKey = {
    "reservaId": "number"
};
const interfaz = {
    "usuarioId": "number",
    "libroId": "number",
    "fecha_reserva": "date",
    "fecha_reserva_fin": "date",
    "estado": "string"
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
//     "id_usuario": 10,
//     "id_libro": 551,
//     "fecha_reserva": "2024-02-01",
//     "fecha_reserva_fin": "Nov 2, 2023",
//     "estado": "In faucibus."
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "id_usuario": 5,
//     "id_libro": 3,
//     "fecha_reserva": "2023-06-11",
//     "fecha_reserva_fin": "Sep 26, 2024",
//     "estado": "amet ultricies"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());