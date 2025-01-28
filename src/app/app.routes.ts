import { Routes } from '@angular/router';
import {LoginComponent} from "./components/Login/login.component";
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard.component';
import {authGuard} from "./service/auth.guard";
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";

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
  {
    path: 'employee/:id', component: EmployeeDetailsComponent,
  }
  ]

// { path: '', component: EmployeeListComponent }

