export class FooterComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="main-footer">
        <!-- To the right -->
        <div class="float-right d-none d-sm-inline">
          <a href="#">GitHub</a>
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy;</strong> Todos los Derechos Reservados.
        </footer>
          `
    }

}

customElements.define("footer-component", FooterComponent)