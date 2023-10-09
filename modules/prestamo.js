import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

export const cargarTablaPrestamo = async ({ fnGetPrestamos }) => {
    let prestamos = await fnGetPrestamos();
    const table = new DataTable('#dt-prestamos', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

    if (!prestamos.status) {
        prestamos.forEach((val) => {
            table.row.add([
                val.id,
                val.libro.titulo,
                `${val.usuario.nombre} ${val.usuario.apellido}`,
                val.fecha_prestamo,
                val.fecha_devolucion,
                val.estado,
            /*html*/`
            <div class="functions">
                <button id="btn-edit-prestamo" class="btn btn-primary f-size-3" type="button" data-edit="${val.id}">Editar</button>
                <button id="btn-del-prestamo" class="btn btn-danger f-size-3" type="button" data-del="${val.id}">Eliminar</button>
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

export const formAgregarPrestamo = async ({ fnGetUsers, fnGetBooks }) => {
    let usuarios = await fnGetUsers();
    let libros = await fnGetBooks();
    let selectUsuarios = await Promise.all(crearOptions(usuarios));
    let selectLibros = await Promise.all(crearOptions(libros));

    return /*html*/`
    <div>
    <h4>Agregar Prestamo</h4>
    <hr>
    <form id="add-prestamo-form">
            <div class="form-group mb-0">
                <label for="date-start">Fecha Prestamo</label>
                <input type="date" name="fecha_prestamo" class="form-control"
                    id="date-start" required>
            </div>
            <div class="form-group mb-0">
                <label for="date-end">Fecha Devolucion</label>
                <input type="date" name="fecha_devolucion" class="form-control"
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
            <button type="submit" class="btn btn-primary f-size-3" form="add-prestamo-form">Agregar</button>
        </div>
    </div>
    `
}

export const formEditarPrestamo = async ({ fnGetUsers, fnGetBooks, prestamo }) => {
    let usuarios = await fnGetUsers();
    let libros = await fnGetBooks();
    let selectUsuarios = await Promise.all(crearOptions(usuarios));
    let selectLibros = await Promise.all(crearOptions(libros));

    return /*html*/`
    <div>
    <h4>Editar Prestamo</h4>
    <hr>
    <form id="edit-prestamo-form" data-edit="${prestamo.id}">
            <div class="form-group mb-0">
                <label for="date-start">Fecha Inicio Prestamo</label>
                <input type="date" name="fecha_prestamo" class="form-control"
                    id="date-start" required value="${prestamo.fecha_prestamo}">
            </div>
            <div class="form-group mb-0">
                <label for="date-end">Fecha Fin Prestamo</label>
                <input type="date" name="fecha_prestamo_fin" class="form-control"
                    id="date-end" required value="${prestamo.fecha_devolucion}">
            </div>
            <div class="form-group mb-0">
                <label for="estado">Estado</label>
                <input type="text" name="estado" class="form-control"
                    id="estado" required value="${prestamo.estado}">
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
            <button type="submit" class="btn btn-primary f-size-3" form="edit-prestamo-form">Agregar</button>
        </div>
    </div>
    `
}

const numeroValido = (e) => {
    return isNaN(e) ? "" : Number(e);
}

export const agregarPrestamo = async ({ data, fnPostPrestamo }) => {
    let res = await fnPostPrestamo({
        "usuarioId": numeroValido(data.usuarioId),
        "libroId": numeroValido(data.libroId),
        "estado": data.estado,
        "fecha_prestamo": data.fecha_prestamo,
        "fecha_devolucion": data.fecha_devolucion,
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible agregar." })
    }
}

export const eliminarPrestamo = async ({ id, fnDelPrestamo }) => {
    if (!isNaN(Number(id))) {
        await fnDelPrestamo(numeroValido(id));
    } else {
        swalAlert({ type: 'error', title: "No fue posible eliminar." })
    }
}

export const editarPrestamo = async ({ data, fnPutPrestamo }) => {
    let res = await fnPutPrestamo({
        "id": numeroValido(data.id),
        "usuarioId": numeroValido(data.usuarioId),
        "libroId": numeroValido(data.libroId),
        "estado": data.estado,
        "fecha_prestamo": data.fecha_prestamo,
        "fecha_prestamo_fin": data.fecha_prestamo_fin,
    })
    if ("id" in res) {
        swalAlert({ type: 'success', title: "Agregado con exito." })
    } else {
        swalAlert({ type: 'error', title: "No fue posible editar." })
    }
}