import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule]
})
export class RegisterComponent {
  user = { 
    email: '', 
    password: '',
    name: '',
    city: '',
    gender: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (!this.user.email || !this.user.password || !this.user.name) {
      alert('Please enter name, email and password');
      return;
    }
    this.authService.register(this.user);
    alert('Registration successful! Please log in.');
    this.router.navigate(['/login']);
  }
}
