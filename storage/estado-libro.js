import env from "../config.js"
import { isCampoValido } from "../util/validaciones.js"

const uri = `${env.ssl + env.hostName}:${env.port}`;
const endpoint = `/estado-libro`;
const primaryKey = {
    "id_estado": "number"
};
const interfaz = {
    "nombre": "string",
    "descripcion": "string",
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

export const post = async (obj) => {
    let body = {};
    try {
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
    let body = {};
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: obj.id, tipoEsperado: Object.values(primaryKey)[0] });
        Object.entries(interfaz).forEach(e => Object.assign(body, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })));
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "PUT";
    config.body = JSON.stringify(body);
    let res = await (await fetch(`${uri}${endpoint}/${obj.id}`, config)).json();
    return res;
}

// * POST DE PRUEBA
// console.log(await post({
//     "nombre": "Demetrius Slater",
//     "descripcion": "quis accumsan convallis, ante lectus convallis est, vitae"
// }));

// * PUT DE PRUEBA
// console.log(await putOne({
//     "id": 2,
//     "nombre": "Reese Marks",
//     "descripcion": "eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis"
// }));

// * DELETE DE PRUEBA
// console.log(await deleteOne(2));

// * GETALL DE PRUEBA
// console.log(await getAll());