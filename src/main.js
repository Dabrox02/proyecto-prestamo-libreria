const URI = "http://localhost:5050/libros";

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


// OBTENER

// console.log(await getData(URI));

// AGREGAR
// let res = await postData({
//     URI,
//     body: {
//         "autor": "Jacob Lopez",
//         "fecha": 2023,
//     }
// });
// console.log(res.ok ? "Agregado" : "Fallido");

