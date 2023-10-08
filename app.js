import autor from "./api/storage/autor.js"
import categoria from "./api/storage/categoria.js"
import editorial from "./api/storage/editorial.js"
import estado from "./api/storage/estado.js"
import libro from "./api/storage/libro.js"
import config from "./config.js";
import { cargarTabla, cargarSelectsForm, agregarLibro, eliminarLibro } from "./modules/libro.js";

const d = document;

export const app = async () => {
    let path = window.location.pathname.split(".")[0];
    if (path === "/index") {
        console.log(path);
    }

    if (path === "/views/libros") {
        let fnGetLibros = libro.getAllDetails;
        cargarTabla({ url: config.uri, fnGetLibros });
        let authors = await autor.getAll();
        let categories = await categoria.getAll();
        let editorials = await editorial.getAll();
        let states = await estado.getAll();
        cargarSelectsForm({ authors, categories, editorials, states })

        document.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#add-book-form")) {
                let data = Object.fromEntries(new FormData(e.target));
                await agregarLibro({ data, fnPostLibro: libro.post });
            }
        })

        document.addEventListener("click", async (e) => {
            if (e.target.matches("#btn-del-book")) {
                await eliminarLibro({ id: e.target.dataset.del, fnDelLibro: libro.deleteOne });
            }
        })
    }

}