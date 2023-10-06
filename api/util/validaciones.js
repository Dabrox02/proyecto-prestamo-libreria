import env from "../config.js"

export const isCampoValido = ({ campo = "", valor, tipoEsperado }) => {
    if (valor === null || valor === undefined) throw new Error(`Campo: ${campo}. No esta definido`);
    if (tipoEsperado == "date") {
        valor = new Date(valor);
        if (isNaN(valor.getTime()) || !(valor.getFullYear() <= 2040)) throw new Error(`La fecha es inválida.`);
    };
    if (valor.constructor.name.toLowerCase() !== tipoEsperado.toLowerCase()) throw new Error(`El campo ${campo} con valor ${valor} no corresponde al tipo de dato.`);
    return { [campo]: valor instanceof Date ? valor.toISOString().split('T')[0] : valor };
}

export const isObjectoValido = (obj) => {
    if (obj == undefined || obj.constructor.name !== "Object" || Object.entries(obj).length == 0) throw new Error(`Parametros incorrectos.`);
}

export const isRelacionValida = async ({ obj }) => {
    for (const key of ["autoreId", "categoriaId", "editorialeId", "estadoId", "usuarioId", "libroId"]) {
        if (obj[key]) {
            let valid = await (await fetch(`${env.uri}/${key.split("I")[0]}s/${obj[key]}`)).json();
            if (Object.entries(valid).length == 0) throw new Error(`Valor ${obj[key]} del campo ${key}, no existe.`);
        }
    }
}

export const isDataCompleta = async ({ obj }) => {
    for (const e of obj) {
        isObjectoValido(e);
        await isRelacionValida({ obj: e });
    }
}