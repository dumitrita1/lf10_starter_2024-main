import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";

export const routes: Routes = [
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  { path: '', component: EmployeeListComponent }
];
