const URI_LIBROS = "http://localhost:5050/libros";

const getData = async (uri) => {
    return await (await fetch(uri)).json();
}

const postData = async ({ URI, body }) => {
    return await fetch(URI, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

const putData = async ({ URI, body }) => {
    return await fetch(URI, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

const delData = async ({ URI }) => {
    return (await fetch(URI, {
        method: "DELETE",
    })).ok;
}


// OBTENER
// console.log(await getData(URI_LIBROS));

// AGREGAR
// let res = await postData({
//     URI,
//     body: {
//         "autor": "Jacob Lopez",
//         "fecha": 2023,
//     }
// });
// console.log(res.ok ? "Agregado" : "Fallido");

// ACTUALIZAR
// let res = await putData({
//     URI: URI_LIBROS + "/1",
//     body: {
//         "autor": "Cristian Lopez",
//         "fecha": 2019,
//     }
// });
// console.log(res.ok ? "Actualizado" : "Fallido");

// ELIMINAR
// console.log(await delData({URI: URI_LIBROS + "/4"}));