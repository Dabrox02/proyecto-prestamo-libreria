export const isCampoValido = ({ campo = "", valor, tipoEsperado }) => {
    if (valor === null || valor === undefined) throw new Error(`Campo: ${campo}. No esta definido`);
    if (tipoEsperado == "date") {
        valor = new Date(valor);
        if (isNaN(valor.getTime())) throw new Error('La fecha es inválida.');
    };
    if (valor.constructor.name.toLowerCase() !== tipoEsperado.toLowerCase()) throw new Error(`El campo ${campo} con valor ${valor} no corresponde al tipo de dato.`);
    return {[campo]: valor };
}
