import { HeaderComponent } from "./components/header-component/header-component.js";
import { MainSidebarComponent } from "./components/main-sidebar-component/ main-sidebar-component.js";
import { FooterComponent } from "./components/footer-component/footer-component.js";
import { CardComponent } from "./components/card-component/card-component.js";
import { app } from "./app.js";

addEventListener("DOMContentLoaded", async (e) => {
    await app()
})