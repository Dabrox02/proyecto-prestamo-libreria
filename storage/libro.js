import env from "../config.js"
import { isCampoValido, isObjectoValido } from "../util/validaciones.js"

const uri = `${env.ssl + env.hostName}:${env.port}`;
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
const config = {
    method: undefined,
    headers: { "content-type": "application/json" },
}

export const getAll = async () => {
    config.method = "GET";
    config.body = undefined;
    let res = await (await fetch(`${uri}${endpoint}`, config)).json();
    return res;
}

export const getOne = async (id) => {
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: id, tipoEsperado: Object.values(primaryKey)[0] });
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "GET";
    config.body = undefined;
    let res = await (await fetch(`${uri}${endpoint}/${id}`, config)).json();
    return res;
}

export const post = async (obj = {}) => {
    let body = {}
    try {
        isObjectoValido(obj);
        Object.entries(interfaz).forEach(e => Object.assign(body, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })));
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "POST";
    config.body = JSON.stringify(body);
    let res = await (await fetch(`${uri}${endpoint}`, config)).json();
    return res;
}

export const deleteOne = async (id) => {
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: id, tipoEsperado: Object.values(primaryKey)[0] });
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "DELETE";
    let res = await fetch(`${uri}${endpoint}/${id}`, config);
    return res.status;
}

export const putOne = async (obj = {}) => {
    let newData = {};
    let oldData = {};
    try {
        oldData = await getOne(obj.id);
        isObjectoValido(obj);
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: obj.id, tipoEsperado: Object.values(primaryKey)[0] });
        Object.entries(interfaz).forEach(e => {
            obj[e[0]] ? Object.assign(newData, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })) : "";
        })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "PUT";
    config.body = JSON.stringify({ ...oldData, ...newData });
    let res = await (await fetch(`${uri}${endpoint}/${obj.id}`, config)).json();
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