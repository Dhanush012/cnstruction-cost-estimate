import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-constructor-register',
  standalone:true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './constructor-register.component.html',
  styleUrl: './constructor-register.component.css'
})
export class ConstructorRegisterComponent {
registerForm: FormGroup;
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Simulate registration logic (replace with actual registration logic)
      this.router.navigate(['']); // Redirect to login page after successful registration
    }
  }
}
