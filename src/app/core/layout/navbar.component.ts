import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faSignIn, faSignOut, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { LightService } from '../../shared/services/light.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private router: Router) { }

  light = inject(LightService);
  auth = inject(AuthService);

  isLoggedIn = this.auth.getLoggedInSignal();
  lightMode = this.light.getSignal();

  faBook = faBook
  faSignIn = faSignIn
  faSignOut = faSignOut
  faSun = faSun
  faMoon = faMoon

  toggleTheme() {
    this.light.setMode(!this.lightMode())
  }

  logOut() {
    this.auth.setLoggedOut();
    this.router.navigateByUrl("login")
  }
}
