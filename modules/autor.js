import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaAutor = async ({ fnGetAutores }) => {
    let authors = await fnGetAutores();
    const table = new DataTable('#dt-authors', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!authors.status) {
        authors.forEach((val) => {
            table.row.add([
                val.id,
                val.nombre,
                val.apellido,
                val.nacionalidad,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-author" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-author" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>`]).draw();
        })
    }
}

export const formAgregarAuthor = () => {
    return /*html*/`
    <div>
    <h4>Agregar Autor</h4>
    <hr>
    <form id="add-author-form">
            <div class="form-group mb-0">
                <label for="name-author">Nombres</label>
                <input type="text" name="nombre" class="form-control" id="name-author" required>
            </div>
            <div class="form-group  mb-0">
                <label for="surname-author">Apellidos</label>
                <input type="text" name="apellido" class="form-control" id="surname-author" required>
            </div>
            <div class="form-group  mb-0">
                <label for="nationality">Nacionalidad</label>
                <input type="text" name="nacionalidad" class="form-control" id="nationality" required>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-author-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarAutor = (autor) => {
    return /*html*/`
    <div>
    <h4>Editar Autor</h4>
    <hr>
    <form id="edit-author-form" data-edit="${autor.id}">
            <div class="form-group mb-0">
                <label for="name-author">Nombres</label>
                <input type="text" name="nombre" class="form-control" id="name-author" required value="${autor.nombre}">
            </div>
            <div class="form-group  mb-0">
                <label for="surname-author">Apellidos</label>
                <input type="text" name="apellido" class="form-control" id="surname-author" required value="${autor.apellido}">
            </div>
            <div class="form-group  mb-0">
                <label for="nationality">Nacionalidad</label>
                <input type="text" name="nacionalidad" class="form-control" id="nationality" required value="${autor.nacionalidad}">
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-warning f-size-3" form="edit-author-form">Editar</button>
        </div>
    </div>`
}


const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarAutor = async ({ data, fnPostAutor }) => {
    let res = await fnPostAutor({
        "nombre": data.nombre,
        "apellido": data.apellido,
        "nacionalidad": data.nacionalidad
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarAutor = async ({ id, fnDelAutor }) => {
    if (!isNaN(Number(id))) {
        await fnDelAutor(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarAutor = async ({ data, fnPutAutor }) => {
    let res = await fnPutAutor({
        "id": numeroValido(data.id),
        "nombre": data.nombre,
        "apellido": data.apellido,
        "nacionalidad": data.nacionalidad
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}