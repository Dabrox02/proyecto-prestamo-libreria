import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaReserva = async ({ fnGetReservas }) => {
    let reservas = await fnGetReservas();
    const table = new DataTable('#dt-reservas', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!reservas.status) {
        reservas.forEach((val) => {
            table.row.add([
                val.id,
                val.libro.titulo,
                `${val.usuario.nombre} ${val.usuario.apellido}`,
                val.fecha_reserva,
                val.fecha_reserva_fin,
                val.estado,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-reserva" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-reserva" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
            </div>`]).draw();
        })
    }
}

const crearOptions = (elements) => {
    return elements.map((e) => {
        if (e.titulo) {
            return /*html*/`<option value="${e.id}">${e.titulo} </option>`
        }
        return /*html*/`<option value="${e.id}">${e.nombre} ${e.apellido ? e.apellido : ""}</option>`
    })
}

export const formAgregarReserva = async ({ fnGetUsers, fnGetBooks }) => {
    let usuarios = await fnGetUsers();
    let libros = await fnGetBooks();
    let selectUsuarios = await Promise.all(crearOptions(usuarios));
    let selectLibros = await Promise.all(crearOptions(libros));

    return /*html*/`
    <div>
    <h4>Agregar Reserva</h4>
    <hr>
    <form id="add-reserva-form">
            <div class="form-group mb-0">
                <label for="date-start">Fecha Inicio Reserva</label>
                <input type="date" name="fecha_reserva" class="form-control"
                    id="date-start" required>
            </div>
            <div class="form-group mb-0">
                <label for="date-end">Fecha Fin Reserva</label>
                <input type="date" name="fecha_reserva_fin" class="form-control"
                    id="date-end" required>
            </div>
            <div class="form-group mb-0">
                <label for="estado">Estado</label>
                <input type="text" name="estado" class="form-control"
                    id="estado" required>
            </div>
            <div class="form-group mb-0">
                <label for="book">Libro</label>
                <select class="form-control" id="book" name="libroId" required>
                    <option value=""></option>
                    ${selectLibros.join("")}
                </select>
            </div>
            <div class="form-group mb-0">
                <label for="user">Usuario</label>
                <select class="form-control" id="user" name="usuarioId" required>
                    <option value=""></option>
                    ${selectUsuarios.join("")}
                </select>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="add-reserva-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarReserva = async ({ fnGetUsers, fnGetBooks, reserva }) => {
    let usuarios = await fnGetUsers();
    let libros = await fnGetBooks();
    let selectUsuarios = await Promise.all(crearOptions(usuarios));
    let selectLibros = await Promise.all(crearOptions(libros));

    return /*html*/`
    <div>
    <h4>Editar Reserva</h4>
    <hr>
    <form id="edit-reserva-form" data-edit="${reserva.id}">
            <div class="form-group mb-0">
                <label for="date-start">Fecha Inicio Reserva</label>
                <input type="date" name="fecha_reserva" class="form-control"
                    id="date-start" required value="${reserva.fecha_reserva}">
            </div>
            <div class="form-group mb-0">
                <label for="date-end">Fecha Fin Reserva</label>
                <input type="date" name="fecha_reserva_fin" class="form-control"
                    id="date-end" required value="${reserva.fecha_reserva_fin}">
            </div>
            <div class="form-group mb-0">
                <label for="estado">Estado</label>
                <input type="text" name="estado" class="form-control"
                    id="estado" required value="${reserva.estado}">
            </div>
            <div class="form-group mb-0">
                <label for="book">Libro</label>
                <select class="form-control" id="book" name="libroId" required>
                    <option value=""></option>
                    ${selectLibros.join("")}
                </select>
            </div>
            <div class="form-group mb-0">
                <label for="user">Usuario</label>
                <select class="form-control" id="user" name="usuarioId" required>
                    <option value=""></option>
                    ${selectUsuarios.join("")}
                </select>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn-close-modal btn btn-secondary f-size-3">Cerrar</button>
            <button type="submit" class="btn btn-primary f-size-3" form="edit-reserva-form">Agregar</button>
        </div>
    </div>
    `
}

const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarReserva = async ({ data, fnPostReserva }) => {
    let res = await fnPostReserva({
        "usuarioId": numeroValido(data.usuarioId),
        "libroId": numeroValido(data.libroId),
        "estado": data.estado,
        "fecha_reserva": data.fecha_reserva,
        "fecha_reserva_fin": data.fecha_reserva_fin,
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarReserva = async ({ id, fnDelReserva }) => {
    if (!isNaN(Number(id))) {
        await fnDelReserva(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarReserva = async ({ data, fnPutReserva }) => {
    let res = await fnPutReserva({
        "id": numeroValido(data.id),
        "usuarioId": numeroValido(data.usuarioId),
        "libroId": numeroValido(data.libroId),
        "estado": data.estado,
        "fecha_reserva": data.fecha_reserva,
        "fecha_reserva_fin": data.fecha_reserva_fin,
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible editar." })
    }
}