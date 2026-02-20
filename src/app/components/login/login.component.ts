import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginFailed = false;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const username = this.form.value.username;
    const password = this.form.value.password;

    if (username === 'admin' && password === 'admin123') {
      this.loginFailed = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true;
    }
  }
}
