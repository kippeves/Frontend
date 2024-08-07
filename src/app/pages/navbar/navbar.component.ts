import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  auth = inject(AuthService);
  isLoggedIn = this.auth.getLoggedInSignal();
  faHouse = faHouse
  faSignIn = faSignIn
  faSignOut = faSignOut
  logOut() {
    this.auth.logout();
  }
}
