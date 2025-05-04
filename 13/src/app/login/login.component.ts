import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }
    this.authService.login(this.email, this.password);
  }
}
