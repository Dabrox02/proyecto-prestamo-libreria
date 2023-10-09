import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaUsuario = async ({ fnGetUsers }) => {
    let users = await fnGetUsers();  // Modo Fast
    const table = new DataTable('#dt-users', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });
    if (!users.status) {
        users.forEach((val) => {
            table.row.add([
                val.id,
                val.nombre,
                val.apellido,
                val.direccion,
                val.telefono,
                val.email,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-user" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-user" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>`]).draw();
        })
    }
}

export const formAgregarUsuario = () => {
    return /*html*/`
    <div>
    <h4>Agregar Usuario</h4>
    <hr>
    <form id="add-user-form">
            <div class="form-group mb-0">
                <label for="name-user">Nombres</label>
                <input type="text" name="nombre" class="form-control" id="name-user" required>
            </div>
            <div class="form-group  mb-0">
                <label for="surname-user">Apellidos</label>
                <input type="text" name="apellido" class="form-control" id="surname-user" required>
            </div>
            <div class="form-group  mb-0">
                <label for="street-user">Direccion</label>
                <input type="text" name="direccion" class="form-control" id="street-user" required>
            </div>
            <div class="form-group  mb-0">
                <label for="tel-user">Telefono</label>
                <input type="text" name="telefono" class="form-control" id="tel-user" required>
            </div>
            <div class="form-group  mb-0">
                <label for="email-user">Email</label>
                <input type="text" name="email" class="form-control" id="email-user" required>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-user-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarUsuario = (usuario) => {
    return /*html*/`
    <div>
    <h4>Editar Usuario</h4>
    <hr>
    <form id="edit-user-form" data-edit="${usuario.id}">
            <div class="form-group mb-0">
                <label for="name-user">Nombres</label>
                <input type="text" name="nombre" class="form-control" id="name-user" required value="${usuario.nombre}">
            </div>
            <div class="form-group  mb-0">
                <label for="surname-user">Apellidos</label>
                <input type="text" name="apellido" class="form-control" id="surname-user" required value="${usuario.apellido}">
            </div>
            <div class="form-group  mb-0">
                <label for="street-user">Direccion</label>
                <input type="text" name="direccion" class="form-control" id="street-user" required value="${usuario.direccion}">
            </div>
            <div class="form-group  mb-0">
                <label for="tel-user">Telefono</label>
                <input type="text" name="telefono" class="form-control" id="tel-user" required value="${usuario.telefono}">
            </div>
            <div class="form-group  mb-0">
                <label for="email-user">Email</label>
                <input type="text" name="email" class="form-control" id="email-user" required value="${usuario.email}">
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-warning f-size-3" form="edit-user-form">Editar</button>
        </div>
    </div>`
}


const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarUsuario = async ({ data, fnPostUsuario }) => {
    let res = await fnPostUsuario({
        "nombre": data.nombre,
        "apellido": data.apellido,
        "direccion": data.direccion,
        "telefono": data.telefono,
        "email": data.email
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarUsuario = async ({ id, fnDelUsuario }) => {
    if (!isNaN(Number(id))) {
        await fnDelUsuario(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarUsuario = async ({ data, fnPutUsuario }) => {
    let res = await fnPutUsuario({
        "id": numeroValido(data.id),
        "nombre": data.nombre,
        "apellido": data.apellido,
        "direccion": data.direccion,
        "telefono": data.telefono,
        "email": data.email
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}