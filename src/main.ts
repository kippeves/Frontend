import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LightService } from './app/shared/services/light.service';
import { inject } from '@angular/core';



function updateTheme() {
    const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ?
        "dark" :
        "light";
    const savedMode = localStorage.getItem("lightMode");
    if (savedMode != null) {
        document.querySelector("html")?.setAttribute("data-bs-theme", savedMode);
    } else {
        document.querySelector("html")?.setAttribute("data-bs-theme", colorMode);
    }
}

// Set theme on load
updateTheme()
// Update theme when the preferred scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));