import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaCategoria = async ({ fnGetCategories }) => {
    let categories = await fnGetCategories();
    const table = new DataTable('#dt-categories', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!categories.status) {
        categories.forEach((val) => {
            table.row.add([
                val.id,
                val.nombre,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-category" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-category" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>`]).draw();
        })
    }
}

export const formAgregarCategoria = () => {
    return /*html*/`
    <div>
    <h4>Agregar Categoria</h4>
    <hr>
    <form id="add-category-form">
            <div class="form-group mb-0">
                <label for="name-category">Nombre Categoria</label>
                <input type="text" name="nombre" class="form-control" id="name-category" required>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-category-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarCategoria = (categoria) => {
    return /*html*/`
    <div>
    <h4>Editar Categoria</h4>
    <hr>
    <form id="edit-category-form" data-edit="${categoria.id}">
            <div class="form-group mb-0">
                <label for="name-author">Nombre Categoria</label>
                <input type="text" name="nombre" class="form-control" id="name-author" required value="${categoria.nombre}">
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

export const agregarCategoria = async ({ data, fnPostCategoria }) => {
    let res = await fnPostCategoria({ "nombre": data.nombre })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarCategoria = async ({ id, fnDelCategoria }) => {
    if (!isNaN(Number(id))) {
        await fnDelCategoria(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarCategoria = async ({ data, fnPutCategoria }) => {
    let res = await fnPutCategoria({
        "id": numeroValido(data.id),
        "nombre": data.nombre
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}