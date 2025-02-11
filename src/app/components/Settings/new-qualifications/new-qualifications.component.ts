import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {BackendService, QualificationDto} from "../../../backend.service";
import {KeycloakService} from "../../../keycloak.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-qualifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-qualifications.component.html',
  styleUrl: './new-qualifications.component.css'
})
export class NewQualificationsComponent implements OnInit {
  token = "";
  qualificationCreation = "";
  isErrorMessage = false;
  message = "";
  constructor(public backendService: BackendService, public keycloakService: KeycloakService) {

  }

  async ngOnInit() {

    try {
      this.token = await this.keycloakService.getToken();
    } catch (error) {
      console.error('Error in initialization:', error);
    }
  }

  async onSubmit() {
    const qualificationToCreate: QualificationDto = {skill: this.qualificationCreation};
    if (qualificationToCreate.skill === "") {
      console.warn("No qualification entered");
      return;
    }

    try {
      this.backendService.createQualification(qualificationToCreate, this.token).subscribe({
        next: (response) => {
          console.log('Successfully created qualification');
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error creating qualification:', error);
          this.isErrorMessage = true;
        }
      })
    } catch (error) {
      console.error('Error in creating qualification:', error);
      this.isErrorMessage = true;
    } finally {
      this.qualificationCreation = "";
      this.message = this.isErrorMessage ? "Error creating qualification" : "Qualification created";
    }
  }
}
