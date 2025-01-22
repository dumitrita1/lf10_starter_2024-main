import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {NewEmployeeComponent} from "../Employee/new-employee/new-employee.component";
import {AppAdminComponent} from "../Admin/app-admin/app-admin.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, NewEmployeeComponent, AppAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
