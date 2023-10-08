import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTabla = async ({ url, fnGetLibros }) => {
    let books = await fnGetLibros(); // Modo Slow
    // let books = await (await fetch("http://127.0.0.1:5010/libros/details")).json();  // Modo Fast
    const imgTmp = `${url}/assets/img/templateBook.png`;
    const table = new DataTable('#dt-libros', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!books.status) {
        books.forEach((val) => {
            table.row.add([
                val.id,
                val.titulo,
                val.autore.nombre,
                val.estado.nombre,
                val.categoria.nombre,
                val.editoriale.nombre,
                val.fecha_publicacion,
            /*html*/`<img src="${val.urlImg ? val.urlImg : imgTmp}" alt="${val.titulo}" class="img-thumbnail img-table">`,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-book" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-book" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>
            `
            ]).draw()
        })
    }
}

export const cargarSelectsForm = ({ categories, authors, states, editorials }) => {
    let selectCategoria = document.querySelector("#category-book");
    let selectAuthor = document.querySelector("#author-book");
    let selectEditorial = document.querySelector("#editorial-book");
    let selectState = document.querySelector("#state-book");

    categories.forEach((e) => {
        selectCategoria.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

    authors.forEach((e) => {
        selectAuthor.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

    editorials.forEach((e) => {
        selectEditorial.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

    states.forEach((e) => {
        selectState.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })
}

const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarLibro = async ({ data, fnPostLibro }) => {
    let res = await fnPostLibro({
        "autoreId": numeroValido(data.autoreId),
        "categoriaId": numeroValido(data.categoriaId),
        "editorialeId": numeroValido(data.editorialeId),
        "titulo": (data.titulo).toUpperCase(),
        "fecha_publicacion": data.fecha_publicacion,
        "isbn": (data.isbn).toLowerCase(),
        "num_paginas": numeroValido(data.num_paginas),
        "estadoId": numeroValido(data.estadoId),
        "urlImg": data.urlImg ? data.urlImg : null
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarLibro = async ({ id, fnDelLibro }) => {
    if (!isNaN(Number(id))) {
        await fnDelLibro(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}