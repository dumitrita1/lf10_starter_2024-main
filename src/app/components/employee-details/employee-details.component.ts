import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { KeycloakService } from '../../keycloak.service';
import { AuthService } from '../../service/auth.service';
import Employee from '../Employee/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  id = 0;
  token = '';
  isError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public backendService: BackendService,
    public keycloakService: KeycloakService,
    public authService: AuthService
  ) {
    this.employee = {};
  }

  
  async ngOnInit() {
    try {
      this.token = await this.keycloakService.getToken();
      this.route.params.subscribe((params) => {
        const id = params['id'];
        this.id = id;
        this.loadEmployeeData(id);
      });

      this.updateEditButton();
      this.updateDeleteButton();
    } catch (error) {
      console.error('Error in initialization:', error);
    }
  }

  openEditEmployee() {
    if (this.authService.getRole() !== 'admin') {
      console.warn('Unauthorized attempt to edit employee');
      return;
    }
  
    this.router.navigate(['/edit-employee', this.employee.id]);
  }
  

  private loadEmployeeData(id: number) {
    this.backendService.getEmployeeById(id, this.token).subscribe({
      next: (response) => {
        if (response) {
          this.employee = response;
          console.log('Employee loaded:', this.employee);
        }
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.isError = true;
      },
    });
  }

  private updateEditButton() {
    if (this.authService.getRole() !== 'admin' || this.isError) {
      const editButton = document.getElementById('edit-btn');
      if (editButton) {
        console.log('Disabling delete button');
        editButton.setAttribute('disabled', 'true');
        editButton.style.backgroundColor = 'grey';
      }
    }
  }
  
  private updateDeleteButton() {
    if (this.authService.getRole() !== 'admin' || this.isError) {
      const deleteButton = document.getElementById('delete-button');
      if (deleteButton) {
        console.log('Disabling delete button');
        deleteButton.setAttribute('disabled', 'true');
        deleteButton.style.backgroundColor = 'grey';
      }
    }
  }

  employeeName(): string {
    return this.employee?.firstName && this.employee?.lastName
      ? `${this.employee.firstName} ${this.employee.lastName}`
      : `[Keinen Mitarbeiter mit der ID ${this.id} gefunden]`;
  }

  employeeDescription(): string {
    return this.employee?.street &&
      this.employee?.postcode &&
      this.employee?.city
      ? `${this.employee.street}, ${this.employee.postcode} ${this.employee.city}`
      : 'N/A';
  }

  employeeSkillset(): string {
    if (!this.employee?.skillSet || !Array.isArray(this.employee.skillSet)) {
      return 'Keine Qualifikationen angegeben';
    }

    try {
      return (
        this.employee.skillSet.join(', ') || 'Keine Qualifikationen angegeben'
      );
    } catch (error) {
      console.error('Error processing skillSet:', error);
      return 'Fehler beim Verarbeiten der Qualifikationen';
    }
  }

  employeePhonenumber(): string {
    return this.employee?.phone ?? 'Keine Telefonnummer angegeben';
  }


  addFavorite(): void {
    console.log('Adding to favorites');
  }

  deleteEmployee(): void {
    if (this.authService.getRole() !== 'admin') {
      console.warn('Unauthorized delete attempt');
      return;
    }

    this.backendService.deleteEmployee(this.id, this.token).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        this.router.navigate(['/employee-list']);
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      },
    });
  }
}
