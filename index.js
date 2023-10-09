import { HeaderComponent } from "./components/header-component/header-component.js";
import { SidebarComponent } from "./components/sidebar-component/sidebar-component.js";
import { FooterComponent } from "./components/footer-component/footer-component.js";
import { app } from "./app.js";

addEventListener("DOMContentLoaded", async (e) => {
    await app()
})