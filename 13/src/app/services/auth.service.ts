import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  register(user: any) {
    localStorage.setItem(user.email, JSON.stringify(user));
  }

  login(email: string, password: string) {
    const user = JSON.parse(localStorage.getItem(email) || '{}');
    if (user && user.password === password) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid credentials');
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
