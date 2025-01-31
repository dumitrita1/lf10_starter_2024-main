import { Routes } from '@angular/router';
import {LoginComponent} from "./components/Login/login.component";
import {authGuard} from "./service/auth.guard";
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {NewEmployeeComponent} from "./components/employee/new-employee/new-employee.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee/:id', component: EmployeeDetailsComponent,
  },
  {
    path: 'employee-list', component: EmployeeListComponent,
  },
  {
    path: 'new-employee', component: NewEmployeeComponent,
  }
  ]

// { path: '', component: EmployeeListComponent }

