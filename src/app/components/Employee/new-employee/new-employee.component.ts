import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, Qualification } from '../../employee-list/dummy-model/EmployeeDummy';
import { EmployeeCardComponent } from '../../employee-list/employee-card/employee-card.component';
import {BackendService} from "../../../backend.service";
import {KeycloakService} from "../../../keycloak.service";

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeCardComponent],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent implements OnInit{
  newEmployee: Employee = new Employee();
  addedEmployees: Employee[] = [];
  token = "";

  constructor(public backendService: BackendService, public keycloakService: KeycloakService) {

  }

  async ngOnInit() {

    try {
      this.token = await this.keycloakService.getToken();
    } catch (error) {
      console.error('Error in initialization:', error);
    }
  }
  onSubmit() {

    // Create a new employee object
    const employee = new Employee(
      this.addedEmployees.length + 1, // Simple ID generation
      'assets/dummyimages/profile1.png', // Default avatar
      this.newEmployee.lastName,
      this.newEmployee.firstName,
      this.newEmployee.street,
      this.newEmployee.postcode,
      this.newEmployee.city,
      this.newEmployee.phone,
      [new Qualification(1, this.newEmployee.qualifications?.[0]?.name || '')]
    );
    // TODO check for admin etc
    this.backendService.createEmployee(employee, this.token).subscribe((response) => {
      console.log('Response:', response);
      this.addedEmployees.push(employee);
      this.newEmployee = new Employee();
    });
  }
}
