import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee/Employee";
import {EmployeeCardComponent} from "./employee-card/employee-card.component";
import {employees} from "./dummy-model/DummyData";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent, NavbarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzYzMzQxODgsImlhdCI6MTczNjMzMDU4OCwianRpIjoiNGNkODg4MjQtNWVkMi00OTExLWFlYjUtNGFmZmEwZWNkZTc3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJjNjk4N2Q0ZC0yZWI2LTRiMmItOTkyYi0xMjBiOGQyZDlhZWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.OaKA4CnUeRqxXCOgKhaKb5SR9SKDZtYTX7RCbjdX4YsL_v2Rv4EXDQHaySq_Xw65JlmaE6QD01Z4D4gxlT1LEvu-xjuSwXkOReiB0iE78h1kDrDlQiDo5WzSe7v9QLDSX0YTJ5juMCfFqhT8npgNnXdr8g5KmpoRDKKpNrh0GbXjP3Nk66W9h2k1OJrHh8GmEaGCaEowQJzzfc0sjZODYoH-aY7e3wEefPyfQredynIOHBRSsh5gNuSEOT4RsBH_RVOcAru9s2eTMdUyszY1F0BpdWUlWOEf3Mn8eLYWLHsvxP_zVjtDLS6alFf-atJodBtV6rEYlQ6LN5igEbQR1w"

  employees$: Observable<Employee[]>;
  dummyEmployees: Employee[] = employees;
  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
