import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router) { }

  userExists = localStorage.getItem("localUser") != null
  loggedIn = signal(this.userExists);
  http = inject(HttpClient)

  async login(user: { username: string, password: string }): Promise<{ success: boolean, message: string | undefined }> {
    let answer: boolean;
    let response: { success: boolean, message: string };
    var api = this.http.post("https://localhost:7278/api/login/authorize/", user, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
      }
    }).subscribe({
      next: res => {
        if (res) {
          const data = res as { success: boolean, token: string | undefined, message: string | undefined }
          if (data.success) {
            localStorage.setItem("localUser", data.token!);
            this.loggedIn.set(true);
          }
          response = {
            success: data.success,
            message: data.message ?? ""
          }
        }
        answer = true;
      },
      error: e => { },
      complete: () => { }
    });

    return new Promise((resolve) => {
      setInterval(() => {
        if (answer) resolve(response)
      }, 500)
    })
  };

  logout() {
    localStorage.removeItem("localUser");
    this.loggedIn.set(false);
  }

  getLoggedInSignal() {
    return this.loggedIn
  }
}
