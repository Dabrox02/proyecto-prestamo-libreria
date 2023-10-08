import config from "../../config.js";

export class HeaderComponent extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="${config.uri}/index.html" class="nav-link f-size-3">Inicio</a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link f-size-3">GitHub</a>
          </li>
        </ul>
  
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <!-- Widget FullScreen -->
          <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <!-- Control Sidebar -->
          <!-- <li class="nav-item">
            <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i class="fas fa-th-large"></i>
            </a>
          </li> -->
        </ul>
      </nav>
        `
  }

}

customElements.define("header-component", HeaderComponent)