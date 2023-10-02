import env from "../config.js"
import { isCampoValido } from "../util/validaciones.js"

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {
    method: undefined,
    headers: { "content-type": "application/json" },
}

export const getAll = async () => {
    config.method = "GET";
    config.body = undefined;
    let res = await (await fetch(`${uri}/libro`, config)).json();
    return res;
}

export const post = async (obj) => {
    const { autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId } = obj;
    let date = new Date(fechaLanzamiento);
    try {
        isCampoValido({ campo: "date", valor: date, tipoEsperado: "date" })
        if (!(date.getFullYear() <= 2040)) throw new Error(`${date}. Fecha invalida`);
        isCampoValido({ campo: "autorId", valor: autorId, tipoEsperado: "number" })
        isCampoValido({ campo: "categoriaId", valor: categoriaId, tipoEsperado: "number" })
        isCampoValido({ campo: "editorialId", valor: editorialId, tipoEsperado: "number" })
        isCampoValido({ campo: "titulo", valor: titulo, tipoEsperado: "string" })
        isCampoValido({ campo: "isbn", valor: isbn, tipoEsperado: "string" })
        isCampoValido({ campo: "numPaginacion", valor: numPaginacion, tipoEsperado: "number" })
        isCampoValido({ campo: "estadoId", valor: estadoId, tipoEsperado: "number" })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro`, config)).json();
    return res;
}

export const deleteOne = async (id) => {
    try {
        isCampoValido({ campo: "id", valor: id, tipoEsperado: "number" })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "DELETE";
    let res = await fetch(`${uri}/libro/${id}`, config);
    return res.status;
}

export const putOne = async (obj = {}) => {
    const { id, autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId } = obj;
    let date = new Date(fechaLanzamiento);
    try {
        isCampoValido({ campo: "id", valor: id, tipoEsperado: "number" })
        isCampoValido({ campo: "date", valor: date, tipoEsperado: "date" })
        if (!(date.getFullYear() <= 2040)) throw new Error(`${date}. Fecha invalida`);
        isCampoValido({ campo: "autorId", valor: autorId, tipoEsperado: "number" })
        isCampoValido({ campo: "categoriaId", valor: categoriaId, tipoEsperado: "number" })
        isCampoValido({ campo: "editorialId", valor: editorialId, tipoEsperado: "number" })
        isCampoValido({ campo: "titulo", valor: titulo, tipoEsperado: "string" })
        isCampoValido({ campo: "isbn", valor: isbn, tipoEsperado: "string" })
        isCampoValido({ campo: "numPaginacion", valor: numPaginacion, tipoEsperado: "number" })
        isCampoValido({ campo: "estadoId", valor: estadoId, tipoEsperado: "number" })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
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
//     "id": 3,
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
// console.log(await deleteOne(6));

// * GETALL DE PRUEBA
// console.log(await getAll());