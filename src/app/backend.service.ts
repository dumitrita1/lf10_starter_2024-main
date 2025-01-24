import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:5432';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    console.log(this.http.get(`${this.apiUrl}/employees`).subscribe());
    return this.http.get(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${id}`);
  }

  // Add other methods to interact with your backend API
}
