
import { Routes } from '@angular/router';
import { LoginComponent } from "./components/Login/login.component";
import { authGuard } from "./service/auth.guard";
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { SettingsComponent } from "./components/Settings/settings.component";
import { QualificationsComponent } from "./components/Qualifications/qualifications.component";

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [authGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'qualifications', component: QualificationsComponent, canActivate: [authGuard] },

  { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

