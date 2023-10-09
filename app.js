import autor from "./api/storage/autor.js"
import categoria from "./api/storage/categoria.js"
import editorial from "./api/storage/editorial.js"
import estado from "./api/storage/estado.js"
import libro from "./api/storage/libro.js"
import usuario from "./api/storage/usuario.js"
import reserva from "./api/storage/reserva.js"
import prestamo from "./api/storage/prestamo.js"
import config from "./config.js";
import { cargarTablaAutor, formAgregarAuthor, agregarAutor, eliminarAutor, editarAutor, formEditarAutor } from "./modules/autor.js"
import { cargarTablaLibro, formAgregarLibro, agregarLibro, eliminarLibro, editarLibro, formEditarLibro } from "./modules/libro.js";
import { cargarTablaCategoria, formAgregarCategoria, agregarCategoria, eliminarCategoria, editarCategoria, formEditarCategoria } from "./modules/categoria.js";
import { cargarTablaEstado, formAgregarEstado, agregarEstado, eliminarEstado, editarEstado, formEditarEstado } from "./modules/estados.js";
import { cargarTablaEditorial, formAgregarEditorial, agregarEditorial, eliminarEditorial, editarEditorial, formEditarEditorial } from "./modules/editorial.js";
import { cargarTablaUsuario, formAgregarUsuario, agregarUsuario, eliminarUsuario, editarUsuario, formEditarUsuario } from "./modules/usuario.js";
import { cargarTablaReserva, formAgregarReserva, agregarReserva, eliminarReserva, editarReserva, formEditarReserva } from "./modules/reserva.js";
import { cargarTablaPrestamo, formAgregarPrestamo, agregarPrestamo, eliminarPrestamo, editarPrestamo, formEditarPrestamo } from "./modules/prestamo.js";


const d = document;
const $ = (e) => d.querySelector(e);

export const app = async () => {

    document.addEventListener("click", async (e) => {
        if (e.target.matches(".btn-close-modal")) {
            e.target.closest("dialog").close();
        }
    })

    let path = window.location.pathname.split(".")[0];
    if (path === "/index") {
        console.log(path);
    }

    if (path === "/views/libros") {
        let fnGetLibros = libro.getAllDetails;
        cargarTablaLibro({ url: config.uri, fnGetLibros });

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-book-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarLibro({ data, fnPostLibro: libro.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-book-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarLibro({ data: { "id": e.target.dataset.edit, ...data }, fnPutLibro: libro.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-book")) {
                $("#modal-book").showModal();
                $("#modal-book").innerHTML = "";
                $("#modal-book").insertAdjacentHTML("beforeend", await formAgregarLibro({
                    fnGetAuthors: autor.getAll,
                    fnGetCategories: categoria.getAll,
                    fnGetEditorials: editorial.getAll,
                    fnGetStates: estado.getAll
                }));
            }

            if (e.target.matches("#btn-del-book")) {
                await eliminarLibro({ id: e.target.dataset.del, fnDelLibro: libro.deleteOne });
            }

            if (e.target.matches("#btn-edit-book")) {
                let editar = e.target.dataset.edit;
                let book = await libro.getOne(Number(editar));
                $("#modal-book").showModal();
                $("#modal-book").innerHTML = "";
                $("#modal-book").insertAdjacentHTML("beforeend", await formEditarLibro({
                    book,
                    fnGetAuthors: autor.getAll,
                    fnGetCategories: categoria.getAll,
                    fnGetEditorials: editorial.getAll,
                    fnGetStates: estado.getAll
                }));
                $("#category-book").value = book.categoriaId;
                $("#author-book").value = book.autoreId;
                $("#editorial-book").value = book.editorialeId;
                $("#state-book").value = book.estadoId;
            }
        })
    }

    if (path === "/views/autores") {
        cargarTablaAutor({ url: config.uri, fnGetAutores: autor.getAll });

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-author-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarAutor({ data, fnPostAutor: autor.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-author-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarAutor({ data: { "id": e.target.dataset.edit, ...data }, fnPutAutor: autor.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-author")) {
                $("#modal-author").showModal();
                $("#modal-author").innerHTML = "";
                $("#modal-author").insertAdjacentHTML("beforeend", formAgregarAuthor());
            }

            if (e.target.matches("#btn-del-author")) {
                await eliminarAutor({ id: e.target.dataset.del, fnDelAutor: autor.deleteOne });
            }

            if (e.target.matches("#btn-edit-author")) {
                let editar = e.target.dataset.edit;
                let author = await autor.getOne(Number(editar));
                $("#modal-author").showModal();
                $("#modal-author").innerHTML = "";
                $("#modal-author").insertAdjacentHTML("beforeend", formEditarAutor(author));
            }
        })
    }

    if (path === "/views/categorias") {
        cargarTablaCategoria({ url: config.uri, fnGetCategories: categoria.getAll });

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-category-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarCategoria({ data, fnPostCategoria: categoria.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-category-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarCategoria({ data: { "id": e.target.dataset.edit, ...data }, fnPutCategoria: categoria.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-category")) {
                $("#modal-category").showModal();
                $("#modal-category").innerHTML = "";
                $("#modal-category").insertAdjacentHTML("beforeend", formAgregarCategoria());
            }

            if (e.target.matches("#btn-del-category")) {
                await eliminarCategoria({ id: e.target.dataset.del, fnDelCategoria: categoria.deleteOne });
            }

            if (e.target.matches("#btn-edit-category")) {
                let editar = e.target.dataset.edit;
                let category = await categoria.getOne(Number(editar));
                $("#modal-category").showModal();
                $("#modal-category").innerHTML = "";
                $("#modal-category").insertAdjacentHTML("beforeend", formEditarCategoria(category));
            }
        })
    }

    if (path === "/views/estados") {
        cargarTablaEstado({ url: config.uri, fnGetStates: estado.getAll });

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-state-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarEstado({ data, fnPostState: estado.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-state-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarEstado({ data: { "id": e.target.dataset.edit, ...data }, fnPutState: estado.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-state")) {
                $("#modal-state").showModal();
                $("#modal-state").innerHTML = "";
                $("#modal-state").insertAdjacentHTML("beforeend", formAgregarEstado());
            }

            if (e.target.matches("#btn-del-state")) {
                await eliminarEstado({ id: e.target.dataset.del, fnDelState: estado.deleteOne });
            }

            if (e.target.matches("#btn-edit-state")) {
                let editar = e.target.dataset.edit;
                let state = await estado.getOne(Number(editar));
                $("#modal-state").showModal();
                $("#modal-state").innerHTML = "";
                $("#modal-state").insertAdjacentHTML("beforeend", formEditarEstado(state));
            }
        })
    }

    if (path === "/views/editoriales") {
        cargarTablaEditorial({ url: config.uri, fnGetEditorials: editorial.getAll });
        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-editorial-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarEditorial({ data, fnPostEditorial: editorial.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-editorial-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarEditorial({ data: { "id": e.target.dataset.edit, ...data }, fnPutEditorial: editorial.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-editorial")) {
                $("#modal-editorial").showModal();
                $("#modal-editorial").innerHTML = "";
                $("#modal-editorial").insertAdjacentHTML("beforeend", formAgregarEditorial());
            }

            if (e.target.matches("#btn-del-editorial")) {
                await eliminarEditorial({ id: e.target.dataset.del, fnDelEditorial: editorial.deleteOne });
            }

            if (e.target.matches("#btn-edit-editorial")) {
                let editar = e.target.dataset.edit;
                let editor = await editorial.getOne(Number(editar));
                $("#modal-editorial").showModal();
                $("#modal-editorial").innerHTML = "";
                $("#modal-editorial").insertAdjacentHTML("beforeend", formEditarEditorial(editor));
            }
        })
    }

    if (path === "/views/usuarios") {
        cargarTablaUsuario({ url: config.uri, fnGetUsers: usuario.getAll });
        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-user-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarUsuario({ data, fnPostUsuario: usuario.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-user-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarUsuario({ data: { "id": e.target.dataset.edit, ...data }, fnPutUsuario: usuario.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-user")) {
                $("#modal-user").showModal();
                $("#modal-user").innerHTML = "";
                $("#modal-user").insertAdjacentHTML("beforeend", formAgregarUsuario());
            }

            if (e.target.matches("#btn-del-user")) {
                await eliminarUsuario({ id: e.target.dataset.del, fnDelUsuario: usuario.deleteOne });
            }

            if (e.target.matches("#btn-edit-user")) {
                let editar = e.target.dataset.edit;
                let user = await usuario.getOne(Number(editar));
                $("#modal-user").showModal();
                $("#modal-user").innerHTML = "";
                $("#modal-user").insertAdjacentHTML("beforeend", formEditarUsuario(user));
            }
        })
    }

    if (path === "/views/reservas") {
        let fnGetReservas = reserva.getAllDetails;
        cargarTablaReserva({ url: config.uri, fnGetReservas });

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-reserva-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarReserva({ data, fnPostReserva: reserva.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-reserva-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarReserva({ data: { "id": e.target.dataset.edit, ...data }, fnPutReserva: reserva.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-reserva")) {
                $("#modal-reserva").showModal();
                $("#modal-reserva").innerHTML = "";
                $("#modal-reserva").insertAdjacentHTML("beforeend", await formAgregarReserva({
                    fnGetUsers: usuario.getAll,
                    fnGetBooks: libro.getAll
                }));
            }

            if (e.target.matches("#btn-del-reserva")) {
                await eliminarReserva({ id: e.target.dataset.del, fnDelReserva: reserva.deleteOne });
            }

            if (e.target.matches("#btn-edit-reserva")) {
                let editar = e.target.dataset.edit;
                let reserv = await reserva.getOne(Number(editar));
                $("#modal-reserva").showModal();
                $("#modal-reserva").innerHTML = "";
                $("#modal-reserva").insertAdjacentHTML("beforeend", await formEditarReserva({
                    reserva: reserv,
                    fnGetUsers: usuario.getAll,
                    fnGetBooks: libro.getAll
                }));
                $("#book").value = reserv.libroId;
                $("#user").value = reserv.usuarioId;
            }
        })
    }

    if (path === "/views/prestamos") {
        let fnGetPrestamos = prestamo.getAllDetails;
        cargarTablaPrestamo({ url: config.uri, fnGetPrestamos });

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-prestamo-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarPrestamo({ data, fnPostPrestamo: prestamo.post });
                e.target.closest("dialog").close();
            }
            if (e.target.matches("#edit-prestamo-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await editarPrestamo({ data: { "id": e.target.dataset.edit, ...data }, fnPutPrestamo: prestamo.putOne });
                e.target.closest("dialog").close();
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-add-prestamo")) {
                $("#modal-prestamo").showModal();
                $("#modal-prestamo").innerHTML = "";
                $("#modal-prestamo").insertAdjacentHTML("beforeend", await formAgregarPrestamo({
                    fnGetUsers: usuario.getAll,
                    fnGetBooks: libro.getAll
                }));
            }

            if (e.target.matches("#btn-del-prestamo")) {
                await eliminarPrestamo({ id: e.target.dataset.del, fnDelPrestamo: prestamo.deleteOne });
            }

            if (e.target.matches("#btn-edit-prestamo")) {
                let editar = e.target.dataset.edit;
                let loan = await prestamo.getOne(Number(editar));
                $("#modal-prestamo").showModal();
                $("#modal-prestamo").innerHTML = "";
                $("#modal-prestamo").insertAdjacentHTML("beforeend", await formEditarPrestamo({
                    prestamo: loan,
                    fnGetUsers: usuario.getAll,
                    fnGetBooks: libro.getAll
                }));
                $("#book").value = loan.libroId;
                $("#user").value = loan.usuarioId;
            }
        })
    }
}