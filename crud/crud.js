import env from "../config.js"
import { isCampoValido, isObjectoValido, isRelacionValida } from "../util/validaciones.js"

const config = {
    method: undefined,
    headers: { "content-type": "application/json" },
}

const getAll = async ({ endpoint }) => {
    config.method = "GET";
    config.body = undefined;
    let res = await (await fetch(`${env.uri}${endpoint}`, config)).json();
    return res;
}

const getOne = async ({ endpoint, primaryKey, id }) => {
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: id, tipoEsperado: Object.values(primaryKey)[0] });
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "GET";
    config.body = undefined;
    let res = await (await fetch(`${env.uri}${endpoint}/${id}`, config)).json();
    return res;
}

const post = async ({ endpoint, interfaz, foreignKeys, obj }) => {
    let body = {};
    try {
        isObjectoValido(obj);
        Object.entries(interfaz).forEach(e => Object.assign(body, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })));
        await isRelacionValida({obj, foreignKeys});
    } catch (e) {
        return { status: 400, message: e.message }
    }
    config.method = "POST";
    config.body = JSON.stringify(body);
    let res = await (await fetch(`${env.uri}${endpoint}`, config)).json();
    return res;
}

const deleteOne = async ({ endpoint, primaryKey, id }) => {
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: id, tipoEsperado: Object.values(primaryKey)[0] });
    } catch (e) {
        return { status: 400, message: e.message };
    }
    config.method = "DELETE";
    let res = await fetch(`${env.uri}${endpoint}/${id}`, config);
    return res.status;
}

const putOne = async ({ endpoint, primaryKey, foreignKeys, interfaz, obj }) => {
    let data = {};
    try {
        data = {...await getOne({ endpoint, primaryKey, id: obj.id })};
        isObjectoValido(obj);
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: obj.id, tipoEsperado: Object.values(primaryKey)[0] });
        Object.entries(interfaz).forEach(e => obj[e[0]] ? Object.assign(data, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })) : "");
        await isRelacionValida({obj, foreignKeys});
    } catch (e) {
        return { status: 400, message: e.message };
    }
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await (await fetch(`${env.uri}${endpoint}/${obj.id}`, config)).json();
    return res;
}

export default {
    getAll,
    getOne,
    post,
    putOne,
    deleteOne
}