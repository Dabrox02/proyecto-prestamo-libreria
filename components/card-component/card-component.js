export class CardComponent extends HTMLElement {

    constructor() {
        super();
        this.title = this.getAttribute("title") || "Titulo Libro";
        this.descripcion = this.getAttribute("descripcion");
    }

    connectedCallback() {
        this.innerHTML = /*html*/`
        <div class="card text-center" style="width: 15rem; height: 15rem;">
        <div class="card-header">
          <h5 class="m-0">${this.title}</h5>
        </div>
        <div class="card-body">
          <h6 class="card-title">ISBN: ${this.descripcion}</h6>
          <p class="card-text"></p>
        </div>
      </div>
        `
    }
}

customElements.define("card-component", CardComponent)