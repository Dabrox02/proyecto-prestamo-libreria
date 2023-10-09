import autor from "./api/storage/autor.js"
import categoria from "./api/storage/categoria.js"
import editorial from "./api/storage/editorial.js"
import estado from "./api/storage/estado.js"
import libro from "./api/storage/libro.js"
import config from "./config.js";
import { cargarTablaAutor, formAgregarAuthor, agregarAutor, eliminarAutor, editarAutor, formEditarAutor } from "./modules/autor.js"
import { cargarTablaLibro, formAgregarLibro, agregarLibro, eliminarLibro, editarLibro, formEditarLibro } from "./modules/libro.js";
import { cargarTablaCategoria, formAgregarCategoria, agregarCategoria, eliminarCategoria, editarCategoria, formEditarCategoria } from "./modules/categoria.js";
import { cargarTablaEstado, formAgregarEstado, agregarEstado, eliminarEstado, editarEstado, formEditarEstado } from "./modules/estados.js";



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
}