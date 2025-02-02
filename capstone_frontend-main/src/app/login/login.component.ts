import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Handle form submission and login logic
  onLogin() {
    if (this.loginForm.valid) {
      const { role, email, password } = this.loginForm.value;

      this.authService.loginUser({ role, email, password }).subscribe({
        next: (response) => {
          this.authService.storeToken(response.token);
          // Redirect based on role
          if (role === 'constructor') {
            this.router.navigate(['/constructor-home']);
          } else if (role === 'user') {
            this.router.navigate(['/user-home']);
          } else if (role === 'admin') {
            this.router.navigate(['/admin-home']);
          }
        },
        error: () => {
          this.loginError = 'Invalid email, password, or role';
        },
      });
    }
  }

  // Navigate to registration page and pass the selected role
  navigateToRegister(role: string) {
    this.router.navigate(['/register'], { state: { role } });
  }
}
