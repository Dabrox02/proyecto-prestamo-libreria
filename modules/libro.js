export const cargarTabla = async ({ url, fnGetLibros }) => {
    let books = await fnGetLibros();
    const imgTmp = `${url}/assets/img/templateBook.png`;
    const table = new DataTable('#dt-libros', {
        "responsive": true, "lengthChange": true, "autoWidth": false
    });

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

export const cargarSelectsForm = ({ categories, authors, states, editorials }) => {
    let selectCategoria = document.querySelector("#category-book");
    let selectAuthor = document.querySelector("#author-book");
    let selectEditorial = document.querySelector("#editorial-book");
    let selectState = document.querySelector("#state-book");

    categories.forEach((e) => {
        selectCategoria.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

    authors.forEach((e) => {
        selectAuthor.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

    editorials.forEach((e) => {
        selectEditorial.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

    states.forEach((e) => {
        selectState.insertAdjacentHTML("beforeend", /*html*/`
        <option value="${e.id}">${e.nombre}</option>
        `)
    })

}
