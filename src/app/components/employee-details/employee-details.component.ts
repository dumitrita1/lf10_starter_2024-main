import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarComponent} from "../navbar/navbar.component";
import {BackendService} from "../../backend.service";
import {KeycloakService} from "../../keycloak.service";
import {AuthService} from "../../service/auth.service";
import {LogoutFooterComponent} from "./logout-footer/logout-footer.component";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    LogoutFooterComponent
  ],
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: any;
  id = 0;
  token = "";

  constructor(private router: Router,private route: ActivatedRoute, public backendService: BackendService, public keycloakService: KeycloakService, public authSerive: AuthService) {
    this.employee = {};
  }

  async ngOnInit() {
    this.token = await this.keycloakService.getToken();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
      this.backendService.getEmployeeById(id, this.token).subscribe({
        next: (next) => {
          this.employee = next;
          console.log(this.employee);
        },
        error: (error) => {
          console.error(error);
        }
      });
      // Hier dann Mitarbeiterdaten laden
      console.log('Employee: ' + this.employee);
      // TODO: use service to get employee by ID
    });

    // if the user is not admin, grey out the delete button
    if (this.authSerive.getRole() !== 'admin') {
      const deleteButton = document.getElementById('delete-button');
      if (deleteButton) {
        deleteButton.setAttribute('disabled', 'true');
        deleteButton.style.backgroundColor = 'grey';
      }
    }
  }




  employeeName() {
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }

  employeeDescription() {
    return `${this.employee.street}, ${this.employee.postcode} ${this.employee.city}.`;
  }

  employeeDepartment() {
    return this.employee.skillSet.map((skill: { skill: any; }) => skill.skill).join(', ');
  }


  employeePhonenumber() {
    return this.employee.phone;
  }

  // Buttons
  addFavorite() {
    // Platzhalter
    console.log('Adding to favorites');
  }

  deleteEmployee() {
    if (this.authSerive.getRole() === 'admin') {
      this.backendService.deleteEmployee(this.id, this.token).subscribe({
        next: (next) => {
          console.log('Employee deleted');
          // go to employee-list page
          this.router.navigate(['/employee-list']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }


}
