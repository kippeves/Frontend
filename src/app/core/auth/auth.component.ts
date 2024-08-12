import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormInputComponent } from '../../shared/components/form-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './auth.component.html'
})

export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) { }

  auth = inject(AuthService)
  onLogin() {
    this.auth.login({ username: this.loginForm.value.username!, password: this.loginForm.value.password! }).subscribe(res => {
      if (res.success) {
        this.auth.setLoggedIn(res.token)
        this.router.navigateByUrl("books")
      }
    }
    );
  }
}