import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private router: Router) { }
  auth = inject(AuthService);
  isLoggedIn = this.auth.getLoggedInSignal();
  faBook = faBook
  faSignIn = faSignIn
  faSignOut = faSignOut

  logOut() {
    this.auth.setLoggedOut();
    this.router.navigateByUrl("login")
  }
}
