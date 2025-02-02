import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../auth-service/auth.service';
import { RouterModule } from '@angular/router';  // ✅ Add this import

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule], // ✅ Ensure RouterModule is imported
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.registerUser({ username, email, password }).subscribe({
        next: (response) => {
          this.successMessage = response;
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 1500); // Redirect to login page after successful registration
        },
        error: (error) => {
          this.errorMessage = 'Registration failed: ' + error.error;
        }
      });
    }
  }
}

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AuthService } from '../../auth-service/auth.service';
// import { RouterModule } from '@angular/router';  // ✅ Add this import

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
// })
// export class RegisterComponent {
//   registerForm: FormGroup;
//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.registerForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required],
//       role: ['', Validators.required], // Role selection remains in form
//     }, { validators: this.passwordMatchValidator });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     return form.get('password')?.value === form.get('confirmPassword')?.value
//       ? null
//       : { mismatch: true };
//   }

//   onRegister() {
//     if (this.registerForm.valid) {
//       const { username, email, password, role } = this.registerForm.value;
      
//       // Admin should not be able to register via this page
//       if (role === 'admin') {
//         this.errorMessage = 'Admins cannot register through this page.';
//         return;
//       }

//       this.authService.registerUser({ username, email, password, role }).subscribe({
//         next: (response) => {
//           this.successMessage = 'Registration successful!';
//           this.errorMessage = '';
//           setTimeout(() => this.router.navigate(['/login']), 1500); // Redirect to login page after successful registration
//         },
//         error: (error) => {
//           this.errorMessage = 'Registration failed: ' + error.error;
//         }
//       });
//     }
    
  
//   }

// }