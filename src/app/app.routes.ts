// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard.component';
import { authGuard } from './services/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard],
  },
];
