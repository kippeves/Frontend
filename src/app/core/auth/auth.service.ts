import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userExists = localStorage.getItem("localUser") != null
  private loggedIn = signal(this.userExists);
  private api = inject(ApiService)

  login(user: { username: string, password: string }) {
    return this.api.post<{ success: boolean, token: string, message: string }>({ url: 'login/authorize/', data: user });
  };

  setLoggedIn(token: string) {
    localStorage.setItem("localUser", token);
    this.loggedIn.set(true);
  }

  setLoggedOut() {
    localStorage.clear();
    this.loggedIn.set(false);
  }

  getLoggedInSignal() {
    return this.loggedIn
  }
}
