import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  role: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
          ]
        ],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required]
      },
      { validators: passwordMatchValidator } // Apply validator at the form level
    );
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { role?: string } | undefined;
    this.role = state?.role ?? 'user'; // Default to 'user' if undefined
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password, role } = this.registerForm.value;
      this.authService.registerUser({ username, email, password, role }).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Redirecting...';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Registration successful!!';
          this.successMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
      });
    }
  }
}

// ✅ Extracted password match validator function
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}
