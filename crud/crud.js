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

export const post = async (obj) => {
    let body = {};
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