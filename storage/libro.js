import crud from "../crud/crud.js";

const endpoint = `/libro`;
const primaryKey = {
    "id_libro": "number"
};
const interfaz = {
    "id_autor": "number",
    "id_categoria": "number",
    "id_editorial": "number",
    "titulo": "string",
    "fecha_publicacion": "date",
    "isbn": "string",
    "num_paginas": "number",
    "id_estado": "number"
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
//     "id_autor": 1,
//     "id_categoria": 5,
//     "id_editorial": 5,
//     "titulo": "aliquam eu, accumsan",
//     "fecha_publicacion": "2024-04-07",
//     "isbn": "191E0EA6-B795-3651-62D5-2B2EAC8EC7EC",
//     "num_paginas": 1188,
//     "id_estado": 6
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 1,
//     "id_autor": 5,
//     "id_categoria": 1,
//     "id_editorial": 5,
//     "titulo": "in, cursus et, eros. Proin",
//     "fecha_publicacion": "2023-10-18",
//     "isbn": "A32AAAA7-7BA1-3459-17A2-623A8152E1EE",
//     "num_paginas": 258,
//     "id_estado": 1
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());