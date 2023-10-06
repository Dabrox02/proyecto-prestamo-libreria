export class CardComponent extends HTMLElement {

    constructor() {
        super();
        this.title = this.getAttribute("title") || "Titulo Libro";
        this.descripcion = this.getAttribute("descripcion");
    }

    connectedCallback() {
        this.innerHTML = /*html*/`
        <div class="card">
        <div class="card-header">
          <h5 class="m-0">${this.title}</h5>
        </div>
        <div class="card-body">
          <h6 class="card-title">ISBN: ${this.descripcion}</h6>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
        `
    }
}

customElements.define("card-component", CardComponent)