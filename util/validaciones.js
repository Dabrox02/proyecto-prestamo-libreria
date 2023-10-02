export const isCampoValido = ({ campo = "", valor, tipoEsperado }) => {
    if (valor === null || valor === undefined) throw new Error(`Campo: ${campo}. No esta definido`);
    if (valor.constructor.name.toLowerCase() !== tipoEsperado.toLowerCase()) throw new Error(`El campo ${campo} con valor ${valor} no corresponde al tipo de dato.`);
    return true;
}