import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from "../../../backend.service";
import { KeycloakService } from "../../../keycloak.service";
import { throwError } from "rxjs";

export class EmployeeCreation {
  constructor(
    public lastName?: string,
    public firstName?: string,
    public street?: string,
    public postcode?: string,
    public city?: string,
    public phone?: string,
    public qualifications?: string
  ) {}
}

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  newEmployee: EmployeeCreation = new EmployeeCreation();
  addedEmployees: EmployeeCreation[] = [];
  token = "";
  errorMessages: string[] = [];

  constructor(public backendService: BackendService, public keycloakService: KeycloakService) {}

  async ngOnInit() {
    try {
      this.token = await this.keycloakService.getToken();
    } catch (error) {
      console.error('Fehler bei der Initialisierung:', error);
    }
  }

  validateForm(): boolean {
    this.errorMessages = []; 

    if (!this.newEmployee.lastName) {
      this.errorMessages.push('Nachname ist erforderlich.');
    }
    if (!this.newEmployee.firstName) {
      this.errorMessages.push('Vorname ist erforderlich.');
    }
    if (!this.newEmployee.street) {
      this.errorMessages.push('Straße ist erforderlich.');
    }
    if (!this.newEmployee.postcode) {
      this.errorMessages.push('Postleitzahl ist erforderlich.');
    } else if (!/^\d{5}$/.test(this.newEmployee.postcode)) {
      this.errorMessages.push('Postleitzahl muss genau 5 Ziffern enthalten.');
    }
    if (!this.newEmployee.phone) {
      this.errorMessages.push('Telefonnummer ist erforderlich.');
    } else if (!/^\d{7,15}$/.test(this.newEmployee.phone)) {
      this.errorMessages.push('Telefonnummer muss zwischen 7 und 15 Ziffern enthalten.');
    }
    if (!this.newEmployee.qualifications) {
      this.errorMessages.push('Qualifikation ist erforderlich.');
    }
    if (!this.newEmployee.city) {
      this.errorMessages.push('Stadt ist erforderlich.');
    }

    return this.errorMessages.length === 0; 
  }

  onSubmit() {
    if (!this.validateForm()) {
      return; 
    }

    const employee = new EmployeeCreation(
      this.newEmployee.lastName,
      this.newEmployee.firstName,
      this.newEmployee.street,
      this.newEmployee.postcode,
      this.newEmployee.city,
      this.newEmployee.phone,
      this.newEmployee.qualifications
    );

    this.backendService.createEmployee(employee, this.token).subscribe({
      next: (response) => {
        console.log('Antwort:', response);
        this.addedEmployees.push(employee);
        this.newEmployee = new EmployeeCreation();
        this.errorMessages = []; 
      },
      error: (err) => {
        console.error('Fehler:', err);
        this.errorMessages.push('Die Qualifikation(en) existiert nicht!');
      }
    });
  }
}
