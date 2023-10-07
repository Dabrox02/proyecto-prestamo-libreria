import autor from "./api/storage/autor.js"
import libro from "./api/storage/libro.js";
import libros from "./api/storage/libro.js"
import config from "./config.js";

const d = document;

export const app = async () => {
    let path = window.location.pathname.split(".")[0];
    if (path === "/index") {
        console.log(path);
    }

    if (path === "/views/libros") {
        const imgTmp = `${config.uri}/assets/img/templateBook.png`;
        const table = new DataTable('#dt-libros', {
            "responsive": true, "lengthChange": true, "autoWidth": false
        });
        let books = await libros.getAllDetails();

        books.forEach((val, index) => {
            table.row.add([
                val.id,
                val.titulo,
                val.autore.nombre,
                val.estado.nombre,
                val.categoria.nombre,
                val.editoriale.nombre,
                val.fecha_publicacion,
                /*html*/`<img src="${val.urlImg ? val.urlImg : imgTmp}" alt="${val.titulo}" class="img-thumbnail img-table">`
            ]).draw()
        })
    }

}