import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaEditorial = async ({ fnGetEditorials }) => {
    let editorials = await fnGetEditorials();
    const table = new DataTable('#dt-editorial', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!editorials.status) {
        editorials.forEach((val) => {
            table.row.add([
                val.id,
                val.nombre,
                val.direccion,
                val.telefono,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-editorial" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-editorial" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>`]).draw();
        })
    }
}

export const formAgregarEditorial = () => {
    return /*html*/`
    <div>
    <h4>Agregar Editorial</h4>
    <hr>
    <form id="add-editorial-form">
            <div class="form-group mb-0">
                <label for="name-editorial">Nombre Editorial</label>
                <input type="text" name="nombre" class="form-control" id="name-state" required>
            </div>
            <div class="form-group mb-0">
                <label for="street-editorial">Direccion</label>
                <input type="text" name="direccion" class="form-control" id="street-editorial" required>
            </div>
            <div class="form-group mb-0">
                <label for="tel-editorial">Telefono</label>
                <input type="text" name="telefono" class="form-control" id="tel-editorial" required>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-editorial-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarEditorial = (editorial) => {
    return /*html*/`
    <div>
    <h4>Editar Editorial</h4>
    <hr>
        <form id="edit-editorial-form" data-edit="${editorial.id}">
            <div class="form-group mb-0">
                <label for="name-editorial">Nombre Editorial</label>
                <input type="text" name="nombre" class="form-control" id="name-state" required value="${editorial.nombre}">
            </div>
            <div class="form-group mb-0">
                <label for="street-editorial">Direccion</label>
                <input type="text" name="direccion" class="form-control" id="street-editorial" required value="${editorial.direccion}">
            </div>
            <div class="form-group mb-0">
                <label for="tel-editorial">Telefono</label>
            <input type="text" name="telefono" class="form-control" id="tel-editorial" required value="${editorial.telefono}">
    </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-warning f-size-3" form="edit-editorial-form">Editar</button>
        </div>
    </div>`
}


const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarEditorial = async ({ data, fnPostEditorial }) => {
    let res = await fnPostEditorial({
        "nombre": data.nombre,
        "direccion": data.direccion,
        "telefono": data.telefono
    });
    console.log(res);
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarEditorial = async ({ id, fnDelEditorial }) => {
    if (!isNaN(Number(id))) {
        await fnDelEditorial(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarEditorial = async ({ data, fnPutEditorial }) => {
    let res = await fnPutEditorial({
        "id": numeroValido(data.id),
        "nombre": data.nombre,
        "direccion": data.direccion,
        "telefono": data.telefono
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}