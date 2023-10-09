import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaEstado = async ({ fnGetStates }) => {
    let estados = await fnGetStates();
    const table = new DataTable('#dt-states', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!estados.status) {
        estados.forEach((val) => {
            table.row.add([
                val.id,
                val.nombre,
                val.descripcion,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-state" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-state" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>`]).draw();
        })
    }
}

export const formAgregarEstado = () => {
    return /*html*/`
    <div>
    <h4>Agregar Estado</h4>
    <hr>
    <form id="add-state-form">
            <div class="form-group mb-0">
                <label for="name-state">Nombre Estado</label>
                <input type="text" name="nombre" class="form-control" id="name-state" required>
            </div>
            <div class="form-group mb-0">
                <label for="description-state">Descripcion</label>
                <input type="text" name="descripcion" class="form-control" id="description-state" required>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-state-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarEstado = (estado) => {
    return /*html*/`
    <div>
    <h4>Editar Estado</h4>
    <hr>
    <form id="edit-state-form" data-edit="${estado.id}">
            <div class="form-group mb-0">
                <label for="name-author">Nombre Estado</label>
                <input type="text" name="nombre" class="form-control" id="name-author" required value="${estado.nombre}">
            </div>
            <div class="form-group mb-0">
                <label for="description-state">Descripcion</label>
                <input type="text" name="descripcion" class="form-control" id="description-state" required value="${estado.descripcion}">
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-warning f-size-3" form="edit-state-form">Editar</button>
        </div>
    </div>`
}


const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarEstado = async ({ data, fnPostState }) => {
    let res = await fnPostState({
        "nombre": data.nombre,
        "descripcion": data.descripcion
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarEstado = async ({ id, fnDelState }) => {
    if (!isNaN(Number(id))) {
        await fnDelState(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarEstado = async ({ data, fnPutState }) => {
    console.log(data);
    let res = await fnPutState({
        "id": numeroValido(data.id),
        "nombre": data.nombre,
        "descripcion": data.descripcion
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}