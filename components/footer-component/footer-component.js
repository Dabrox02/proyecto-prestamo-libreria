export class FooterComponent extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
        <footer class="main-footer">
        <!-- To the right -->
        <div class="float-right d-none d-sm-inline">
          <a href="https://github.com/Dabrox02" target="_blank">GitHub</a>
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy;</strong> Todos los Derechos Reservados.
        </footer>
          `
  }

}

customElements.define("footer-component", FooterComponent)