import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Employee, Qualification} from '../../employee-list/dummy-model/EmployeeDummy';
import {EmployeeCardComponent} from '../../employee-list/employee-card/employee-card.component';
import {BackendService} from "../../../backend.service";
import {KeycloakService} from "../../../keycloak.service";
import {throwError} from "rxjs";

export class EmployeeCreation {
  constructor(public lastName?: string,
              public firstName?: string,
              public street?: string,
              public postcode?: string,
              public city?: string,
              public phone?: string,
              public qualifications?: string
  ) {
  }
}

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeCardComponent],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent implements OnInit {
  newEmployee: EmployeeCreation = new EmployeeCreation();
  addedEmployees: EmployeeCreation[] = [];
  token = "";
  errorMessage = "";

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
    const employee = new EmployeeCreation(
      this.newEmployee.lastName,
      this.newEmployee.firstName,
      this.newEmployee.street,
      this.newEmployee.postcode,
      this.newEmployee.city,
      this.newEmployee.phone,
      this.newEmployee.qualifications
    );
    // TODO check for admin etc
    console.log("Qualifications:", this.newEmployee.qualifications, " type:", typeof this.newEmployee.qualifications);
    this.backendService.createEmployee(employee, this.token).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.addedEmployees.push(employee);
        this.newEmployee = new EmployeeCreation();
        this.errorMessage = "";
      },
      error: (err) => {
        console.error('Error:', err);
        throwError(() => new Error('Invalid qualification given'));
        this.errorMessage = "Die Qualifikation(en) existiert nicht!";
      }
    });
  }
}
