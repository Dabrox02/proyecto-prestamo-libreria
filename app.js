import autor from "./api/storage/autor.js"
import libro from "./api/storage/libro.js";
import libros from "./api/storage/libro.js"


export const app = async () => {
    let path = window.location.pathname.split(".")[0];

    if (path == "/views/libros") {
        let container = document.querySelector("#grilla-libros");
        let books = await libros.getAll();
        console.log(container);
        console.log(books);
        books.forEach(e => {
            container.insertAdjacentHTML("beforeend", `<card-component 
            title="${e.titulo}"
            descripcion="${e.isbn}"
            >
            </card-component>`)
        });
    }

}