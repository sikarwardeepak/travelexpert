import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const response = await this.authService.login(this.loginForm.value);
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          const role = this.authService.getRole();
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage = 'Invalid login response. Please try again.';
        }
      } catch (error) {
        this.errorMessage = (error as any).message || 'Login failed. Please try again.';
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}