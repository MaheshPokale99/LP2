import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard'; // Import Auth Guard

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protected route
];
