import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (!this.user || !this.user.email) {
      this.router.navigate(['/login']);
    }
  }
}
