import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, Qualification } from '../../employee-list/dummy-model/EmployeeDummy';
import { EmployeeCardComponent } from '../../employee-list/employee-card/employee-card.component';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeCardComponent],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {
  newEmployee: Employee = new Employee();
  addedEmployees: Employee[] = [];

  onSubmit() {
    // Create a new employee object
    const employee = new Employee(
      this.addedEmployees.length + 1, // Simple ID generation
      'assets/dummyimages/profile1.png', // Default avatar
      this.newEmployee.lastName,
      this.newEmployee.firstName,
      this.newEmployee.street,
      this.newEmployee.postcode,
      '', // city is not in form
      this.newEmployee.phone,
      [new Qualification(1, this.newEmployee.qualifications?.[0]?.name || '')]
    );

    // Add to list
    this.addedEmployees.push({...employee});

    // Reset form
    this.newEmployee = new Employee();
  }
}
