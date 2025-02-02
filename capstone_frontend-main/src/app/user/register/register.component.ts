import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  role: string = ''; // Role will be passed from login

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required] // Adding role field to the form
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Retrieve the role passed from the login page if necessary
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.role = navigation.extras.state['role'] || 'user';  // Default to 'user' if no role passed
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password, role } = this.registerForm.value;
      this.authService.registerUser({ username, email, password, role }).subscribe({
        next: (response) => {
          this.successMessage = "Registration successful!";
          this.errorMessage = '';  // Clear any previous error message
          setTimeout(() => this.router.navigate(['/login']), 1500);  // Redirect to login page after successful registration
        },
        error: (err) => {
          this.errorMessage = "Registration successful!";
          this.successMessage = '';  // Clear any previous success message
        }
      });
    }
  }
  
}
