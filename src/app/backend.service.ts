import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Employee} from "./components/employee-list/dummy-model/EmployeeDummy";
import {switchMap} from "rxjs/operators";
import {throwError} from "rxjs";

type EmployeeDto = {
  id: number;
  firstName: string;
  lastName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: String[];
}
type QualificationDto = {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:8089';

  constructor(private http: HttpClient) {}

  getEmployees(bearer: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    }).pipe(
      tap({
        next: (response) => {
          console.log('Successfully loaded employees');
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error loading employees:', error);
        }
      })
    );
  }

  getEmployeeById(id: number, bearer: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    });
  }
  deleteEmployee(id: number, bearer: string): Observable<any> {
    console.log(`Attempting to delete employee with ID: ${id}`);

    return this.http.delete(`${this.apiUrl}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    }).pipe(
      tap({
        next: (response) => {
          console.log(`Successfully deleted employee with ID: ${id}`);
          console.log('Response:', response);
        },
        error: (error) => {
          console.error(`Failed to delete employee with ID: ${id}`);
          console.error('Error:', error);
        }
      })
    );
  }
  createEmployee(employee: Employee, bearer: string): Observable<any> {
    const employeeDto: EmployeeDto = {
      id: 0,
      firstName: employee.firstName ? employee.firstName : '',
      lastName: employee.lastName ? employee.lastName : '',
      street: employee.street ? employee.street : '',
      postcode: employee.postcode ? employee.postcode : '',
      city: employee.city ? employee.city : '',
      phone: employee.phone ? employee.phone : '',
      skillSet: employee.qualifications ? employee.qualifications.map(q => q.name ? q.name : '') : []
    };

    const quals = this.getQualifications(bearer);
    return quals.pipe(
      tap({
        next: (response) => {
          console.log('Response:', response);
          const existingQuals = response.map((q: { skill: string }) => q.skill);
          const newQuals = employee.qualifications ? employee.qualifications.filter(q => q.name && !existingQuals.includes(q.name)) : [];
          newQuals.forEach(q => {
            if (q.name) {
              this.createQualification({ name: q.name }, bearer).subscribe((response) => {
                console.log('Response:', response);
              });
            }
          });
        },
        error: (error) => {
          console.error('Error fetching qualifications:', error);
        }
      }),
      switchMap(() => {
        const invalidSkills = employeeDto.skillSet.filter(skill => !skill);
        if (invalidSkills.length > 0) {
          return throwError(() => new Error('Invalid skill given'));
        }

        return this.http.post(`${this.apiUrl}/employees`, employeeDto, {
          headers: {
            Authorization: `Bearer ${bearer}`
          }
        });
      })
    );
  }
  getQualifications(bearer: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/qualifications`, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    });
  }
  createQualification(qualification: QualificationDto, bearer: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/qualifications`, qualification, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    });
  }
}
