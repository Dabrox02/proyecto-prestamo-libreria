import env from "../config.js"
import { isCampoValido } from "../util/validaciones.js"

const uri = `${env.ssl + env.hostName}:${env.port}`;
const endpoint = `/categoria`;
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

export const post = async (obj) => {
    const { nombre } = obj;
    try {
        isCampoValido({ campo: "nombre", valor: nombre, tipoEsperado: "string" })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}${endpoint}`, config)).json();
    return res;
}

export const deleteOne = async (id) => {
    try {
        isCampoValido({ campo: "id", valor: id, tipoEsperado: "number" })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "DELETE";
    let res = await fetch(`${uri}${endpoint}/${id}`, config);
    return res.status;
}

export const putOne = async (obj = {}) => {
    const { id, nombre } = obj;
    try {
        isCampoValido({ campo: "id", valor: id, tipoEsperado: "number" })
        isCampoValido({ campo: "nombre", valor: nombre, tipoEsperado: "string" })
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}${endpoint}/${id}`, config)).json();
    return res;
}


// * POST DE PRUEBA
// console.log(await post({
//     "nombre": "sed pede. Cum"
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "nombre": "science"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());