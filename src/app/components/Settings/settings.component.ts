import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NewEmployeeComponent } from '../../components/Employee/new-employee/new-employee.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NewEmployeeComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',

})
export class SettingsComponent {

}
