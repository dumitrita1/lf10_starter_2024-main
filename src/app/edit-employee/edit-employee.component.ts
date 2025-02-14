import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../keycloak.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: number = 0;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private route: ActivatedRoute,
    public router: Router,
    private keycloakService: KeycloakService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      skillSet: ['']
    });
  }


  async ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.token = await this.keycloakService.getToken();
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.backendService.getEmployeeById(this.employeeId, this.token).subscribe({
      next: (employee) => {
        const skillSetString = Array.isArray(employee.skillSet) 
          ? employee.skillSet.join(', ') 
          : '';
        this.employeeForm.patchValue({
          ...employee,
          skillSet: skillSetString
        });
      },
      error: (error) => {
        console.error('Error loading employee:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const updatedEmployee = {
        id: this.employeeId,
        ...formValue,
        skillSet: formValue.skillSet.split(',').map((skill: string) => skill.trim())
      };

      this.backendService.editEmployee(this.employeeId, updatedEmployee, this.token).subscribe({
        next: () => {
          this.router.navigate(['/employee', this.employeeId]);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
        }
      });
    }
  }
} 