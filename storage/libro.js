import crud from "../crud/crud.js";

const endpoint = `/libro`;
const primaryKey = {
    "id_libro": "number"
};
const interfaz = {
    "autorId": "number",
    "categoriaId": "number",
    "editorialId": "number",
    "titulo": "string",
    "fechaLanzamiento": "date",
    "isbn": "string",
    "numPaginacion": "number",
    "estadoId": "number"
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
//     "autorId": 628,
//     "categoriaId": 551,
//     "editorialId": 339,
//     "titulo": "aliquam eu, accumsan",
//     "fechaLanzamiento": "2024-04-07",
//     "isbn": "191E0EA6-B795-3651-62D5-2B2EAC8EC7EC",
//     "numPaginacion": 1188,
//     "estadoId": 455
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "autorId": 181,
//     "categoriaId": 467,
//     "editorialId": 515,
//     "titulo": "in, cursus et, eros. Proin",
//     "fechaLanzamiento": "2023-10-18",
//     "isbn": "A32AAAA7-7BA1-3459-17A2-623A8152E1EE",
//     "numPaginacion": 258,
//     "estadoId": 555
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());