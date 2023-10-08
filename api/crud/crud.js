import env from "../config.js"
import { isCampoValido, isObjectoValido, isRelacionValida, isDataCompleta } from "../util/validaciones.js"

const config = {
    method: undefined,
    headers: { "content-type": "application/json" },
}

const getAll = async ({ endpoint }) => {
    try {
        config.method = "GET";
        config.body = undefined;
        let res = await (await fetch(`${env.uri}${endpoint}`, config)).json();
        const validDataPromises = res.map(async (e) => {
            let valid = await isDataCompleta({ obj: [e] });
            return typeof valid === 'undefined' ? e : null;
        });
        const validData = await Promise.all(validDataPromises);
        const cleanData = validData.filter((e) => e !== null);
        return cleanData;
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const getOne = async ({ endpoint, primaryKey, id }) => {
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: id, tipoEsperado: Object.values(primaryKey)[0] });
        config.method = "GET";
        config.body = undefined;
        let res = await (await fetch(`${env.uri}${endpoint}/${id}`, config)).json();
        await isDataCompleta({ obj: [res] });
        return res;
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const getAllDetails = async ({ endpoint }) => {
    try {
        let all = await getAll({ endpoint });
        let uri = `${env.uri}${endpoint}?` + Object.keys(all[0]).filter((e) => e.includes("Id")).map((e) => `_expand=${e.split("I")[0]}&`).join("");
        config.method = "GET";
        config.body = undefined;
        let res = await (await fetch(uri, config)).json();
        const validDataPromises = res.map(async (e) => {
            let valid = await isDataCompleta({ obj: [e] });
            return typeof valid === 'undefined' ? e : null;
        });
        const validData = await Promise.all(validDataPromises);
        const cleanData = validData.filter((e) => e !== null);
        return cleanData;
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

const getOneDetails = async ({ endpoint, primaryKey, id }) => {
    try {
        let one = await getOne({ endpoint, primaryKey, id });
        let uri = `${env.uri}${endpoint}/${id}?` + Object.keys(one).filter((e) => e.includes("Id")).map((e) => `_expand=${e.split("I")[0]}&`).join("");
        console.log(uri);
        config.method = "GET";
        config.body = undefined;
        let res = await (await fetch(uri, config)).json();
        await isDataCompleta({ obj: [res] });
        return res;
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const post = async ({ endpoint, interfaz, obj }) => {
    let body = {};
    try {
        isObjectoValido(obj);
        Object.entries(interfaz).forEach(e => Object.assign(body, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })));
        await isRelacionValida({ obj });
        config.method = "POST";
        config.body = JSON.stringify(body);
        let res = await (await fetch(`${env.uri}${endpoint}`, config)).json();
        return res;
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const deleteOne = async ({ endpoint, primaryKey, id }) => {
    try {
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: id, tipoEsperado: Object.values(primaryKey)[0] });
        config.method = "DELETE";
        let res = await fetch(`${env.uri}${endpoint}/${id}`, config);
        if (res.status == 404) throw new Error(`No fue encontrado para eliminar.`);
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

const putOne = async ({ endpoint, primaryKey, interfaz, obj }) => {
    let data = {};
    try {
        data = { ...await getOne({ endpoint, primaryKey, id: obj.id }) };
        isObjectoValido(obj);
        isCampoValido({ campo: Object.keys(primaryKey)[0], valor: obj.id, tipoEsperado: Object.values(primaryKey)[0] });
        Object.entries(interfaz).forEach(e => obj[e[0]] ? Object.assign(data, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })) : "");
        await isRelacionValida({ obj });
        config.method = "PUT";
        config.body = JSON.stringify(data);
        let res = await (await fetch(`${env.uri}${endpoint}/${obj.id}`, config)).json();
        return res;
    } catch (e) {
        return { status: 400, message: e.message };
    }
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