import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {

  }

  auth = inject(AuthService)

  onLogin() {

    this.auth.login({ username: this.loginForm.value.username!, password: this.loginForm.value.password! }).then(res => {
      this.router.navigateByUrl("books")
    });
  }
}