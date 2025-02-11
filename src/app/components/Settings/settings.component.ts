import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NewEmployeeComponent } from '../../components/Employee/new-employee/new-employee.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BackendService} from "../../backend.service";
import {NewQualificationsComponent} from "./new-qualifications/new-qualifications.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NewEmployeeComponent, CommonModule, FormsModule, NewQualificationsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',

})
export class SettingsComponent {

}
