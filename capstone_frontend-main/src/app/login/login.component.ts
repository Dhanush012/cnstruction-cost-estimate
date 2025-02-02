import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RouterModule]
})
export class LoginComponent {
  
  loginForm: FormGroup;
  loginError: string = '';

  private adminCredentials = { email: 'admin@gmail.com', password: 'admin@123' };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  navigateToRegister() {
    
    this.router.navigate(['/register']);
    
  }
  onLogin() {
    if (this.loginForm.valid) {
      const { role, email, password } = this.loginForm.value;

      if (role === 'admin' && email === this.adminCredentials.email && password === this.adminCredentials.password) {
        this.authService.storeToken('admin-token');
        this.router.navigate(['/admin-home']);
      } else {
        this.authService.loginUser({ role, email, password }).subscribe({
          next: (response) => {
            this.authService.storeToken(response.token);
            if (role === 'constructor') {
              this.router.navigate(['/constructor-home']);
            } else if (role === 'user') {
              this.router.navigate(['/user-home']);
            }
          },
          error: () => {
            this.loginError = 'Invalid email, password, or role';
          },
        });
      }
    }
  }
}
