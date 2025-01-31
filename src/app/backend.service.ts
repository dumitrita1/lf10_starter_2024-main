import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';



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
    });
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
}
