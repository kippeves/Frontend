import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightService {
  constructor() {
    const lightMode = localStorage.getItem("lightMode");
    if (lightMode != null)
      this.darkMode = signal(lightMode == 'dark');
  }

  private darkMode = signal(false);

  setMode(darkMode: boolean) {
    this.darkMode?.set(darkMode);
    localStorage.setItem("lightMode", darkMode ? 'dark' : 'light');
    document.querySelector("html")?.setAttribute("data-bs-theme", darkMode ? 'dark' : 'light');
  }

  getSignal() {
    return this.darkMode;
  }
}
