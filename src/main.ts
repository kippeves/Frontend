import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


function updateTheme() {
    const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ?
        "dark" :
        "light";
    document.querySelector("html")?.setAttribute("data-bs-theme", colorMode);
}

window.addEventListener("scroll", _ => {
    if (window.scrollY > 10) {
        document.getElementById("topNav")?.classList?.add("shadow-sm")
    } else {
        document.getElementById("topNav")?.classList?.remove("shadow-sm")
    }
})

// Set theme on load
updateTheme()
// Update theme when the preferred scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));