export const isCampoValido = ({ campo = "", valor, tipoEsperado }) => {
    if (valor === null || valor === undefined) throw new Error(`Campo: ${campo}. No esta definido`);
    if (tipoEsperado == "date") {
        valor = new Date(valor);
        if (isNaN(valor.getTime()) || !(valor.getFullYear() <= 2040)) throw new Error('La fecha es inválida.');
    };
    if (valor.constructor.name.toLowerCase() !== tipoEsperado.toLowerCase()) throw new Error(`El campo ${campo} con valor ${valor} no corresponde al tipo de dato.`);
    return { [campo]: valor instanceof Date ? valor.toISOString().split('T')[0] : valor };
}

export const isObjectoValido = (obj) => {
    if (obj == undefined || obj.constructor.name !== "Object" || Object.entries(obj).length == 0) throw new Error(`No envio parametros correctos.`);
}

