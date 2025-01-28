import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${id}`);
  }

  // Add other methods to interact with your backend API
}
