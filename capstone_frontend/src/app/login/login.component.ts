import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  private roleRoutes: { [key: string]: string } = {
    constructor: '/constructor-home',
    user: '/user-home',
    admin: '/admin-home'
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.loginError = 'Please fill in all fields correctly.';
      return;
    }
  
    const { role, email, password } = this.loginForm.value;

    // Static admin login (without JWT)
    if (role === 'admin' && email === 'admin@gmail.com' && password === 'admin@123') {
      this.router.navigate(['/admin-home']);
      return;
    }

    // Regular user/constructor login (with JWT)
    this.authService.loginUser({ role, email, password }).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.storeToken(response.token);
        }

        // Redirect based on role
        if (role && this.roleRoutes[role]) {
          this.router.navigate([this.roleRoutes[role]]);
        } else {
          this.loginError = 'Role-based redirection failed.';
        }
      },
      error: (err) => {
        this.loginError = err?.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
