import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee/Employee";
import {EmployeeCardComponent} from "./employee-card/employee-card.component";
import {employees} from "./dummy-model/DummyData";
import {NavbarComponent} from "../navbar/navbar.component";
import { BackendService } from '../../backend.service';
import {KeycloakService} from "../../keycloak.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent, NavbarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;
  employeesToDisplay: any;
  bearer: Promise<string>;
  constructor(private http: HttpClient,
              private backendService: BackendService,
              private keycloakService: KeycloakService) {
    this.bearer = Promise.resolve('');
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.bearer = this.keycloakService.getToken();
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }



  async ngOnInit(): Promise<void> {
    console.log("is logged in: " + this.keycloakService.isLoggedIn());
    //if (this.keycloakService.isLoggedIn()) {
    this.backendService.getEmployees(await this.bearer).subscribe({
      next: (next) => {
        this.employees$ = next;
        this.employeesToDisplay = this.employees$;
        console.log(this.employeesToDisplay);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
 // }
}
