import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTabla = async ({ url, fnGetLibros }) => {
    // let books = await fnGetLibros(); // Modo Slow
    let books = await (await fetch("http://127.0.0.1:5010/libros/details")).json();  // Modo Fast
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
            </div>`]).draw();
        })
    }
}

const crearOptions = (elements) => {
    return elements.map((e) => {
        return /*html*/`<option value="${e.id}">${e.nombre}</option>`
    })
}

export const formAgregarLibro = async ({ fnGetAuthors, fnGetCategories, fnGetEditorials, fnGetStates }) => {
    let autores = await fnGetAuthors();
    let categorias = await fnGetCategories();
    let editoriales = await fnGetEditorials();
    let estados = await fnGetStates();
    let selectsAutores = await Promise.all(crearOptions(autores));
    let selectsCategorias = await Promise.all(crearOptions(categorias));
    let selectsEditoriales = await Promise.all(crearOptions(editoriales));
    let selectsEstados = await Promise.all(crearOptions(estados));

    return /*html*/`
    <div>
    <h4>Agregar Libro</h4>
    <hr>
    <form id="add-book-form">
            <div class="form-group mb-0">
                <label for="title-book">Titulo</label>
                <input type="text" name="titulo" class="form-control" id="title-book" required>
            </div>
            <div class="form-group  mb-0">
                <label for="isbn-book">ISBN</label>
                <input type="text" name="isbn" class="form-control" id="isbn-book" required>
            </div>
            <div class="form-group  mb-0">
                <label for="num-pg-book">Numero de Páginas</label>
                <input type="text" name="num_paginas" class="form-control" id="num-pg-book"
                    required>
            </div>
            <div class="form-group  mb-0">
                <label for="url-book">URL Imagen Libro</label>
                <input type="url" name="urlImg" class="form-control" id="url-book">
            </div>
            <div class="form-group  mb-0">
                <label for="publication-date">Fecha de Publicación</label>
                <input type="date" name="fecha_publicacion" class="form-control"
                    id="publication-date" required>
            </div>
            <div class="form-group  mb-0">
                <label for="category-book">Categoria</label>
                <select class="form-control" id="category-book" name="categoriaId" required>
                    <option value=""></option>
                    ${selectsCategorias.join("")}
                </select>
            </div>
            <div class="form-group  mb-0">
                <label for="author-book">Autor</label>
                <select class="form-control" id="author-book" name="autoreId" required>
                    <option value=""></option>
                    ${selectsAutores.join("")}
                </select>
            </div>
            <div class="form-group  mb-0">
                <label for="editorial-book">Editorial</label>
                <select class="form-control" id="editorial-book" name="editorialeId" required>
                    <option value=""></option>
                    ${selectsEditoriales.join("")}
                </select>
            </div>
            <div class="form-group  mb-0">
                <label for="state-book">Estado</label>
                <select class="form-control" id="state-book" name="estadoId" required>
                    <option value=""></option>
                    ${selectsEstados.join("")}
                </select>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-book-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarLibro = async ({ book, fnGetAuthors, fnGetCategories, fnGetEditorials, fnGetStates }) => {
    let autores = await fnGetAuthors();
    let categorias = await fnGetCategories();
    let editoriales = await fnGetEditorials();
    let estados = await fnGetStates();
    let selectsAutores = await Promise.all(crearOptions(autores));
    let selectsCategorias = await Promise.all(crearOptions(categorias));
    let selectsEditoriales = await Promise.all(crearOptions(editoriales));
    let selectsEstados = await Promise.all(crearOptions(estados));

    return /*html*/`
    <div>
    <h4>Editar Libro</h4>
    <hr>
    <form id="edit-book-form" data-edit="${book.id}">
            <div class="form-group mb-0">
                <label for="title-book">Titulo</label>
                <input type="text" name="titulo" class="form-control" id="title-book" required value="${book.titulo}">
            </div>
            <div class="form-group  mb-0">
                <label for="isbn-book">ISBN</label>
                <input type="text" name="isbn" class="form-control" id="isbn-book" required value="${book.isbn}">
            </div>
            <div class="form-group  mb-0">
                <label for="num-pg-book">Numero de Páginas</label>
                <input type="text" name="num_paginas" class="form-control" id="num-pg-book" required value="${book.num_paginas}">
            </div>
            <div class="form-group  mb-0">
                <label for="url-book">URL Imagen Libro</label>
                <input type="url" name="urlImg" class="form-control" id="url-book" value="${book.urlImg || ""}">
            </div>
            <div class="form-group  mb-0">
                <label for="publication-date">Fecha de Publicación</label>
                <input type="date" name="fecha_publicacion" class="form-control" id="publication-date" required value="${book.fecha_publicacion}">
            </div>
            <div class="form-group  mb-0">
                <label for="category-book">Categoria</label>
                <select class="form-control" id="category-book" name="categoriaId" required>
                    <option value=""></option>
                    ${selectsCategorias.join("")}
                </select>
            </div>
            <div class="form-group  mb-0">
                <label for="author-book">Autor</label>
                <select class="form-control" id="author-book" name="autoreId" required>
                    <option value=""></option>
                    ${selectsAutores.join("")}
                </select>
            </div>
            <div class="form-group  mb-0">
                <label for="editorial-book">Editorial</label>
                <select class="form-control" id="editorial-book" name="editorialeId" required>
                    <option value=""></option>
                    ${selectsEditoriales.join("")}
                </select>
            </div>
            <div class="form-group  mb-0">
                <label for="state-book">Estado</label>
                <select class="form-control" id="state-book" name="estadoId" required>
                    <option value=""></option>
                    ${selectsEstados.join("")}
                </select>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-warning f-size-3" form="edit-book-form">Editar</button>
        </div>
    </div>
    `
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

export const editarLibro = async ({ data, fnPutLibro }) => {
    let res = await fnPutLibro({
        "id": numeroValido(data.id),
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