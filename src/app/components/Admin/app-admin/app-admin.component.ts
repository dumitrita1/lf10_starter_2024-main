import { Component } from '@angular/core';
import {NewEmployeeComponent} from "../../Employee/new-employee/new-employee.component";

@Component({
  selector: 'app-app-admin',
  standalone: true,
  imports: [NewEmployeeComponent],
  templateUrl: './app-admin.component.html',
  styleUrl: './app-admin.component.css'
})
export class AppAdminComponent {

}
