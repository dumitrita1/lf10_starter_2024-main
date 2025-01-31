import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  
import { AuthService } from '../../service/auth.service'; 

@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './qualifications.component.html',
  styleUrl: './qualifications.component.css',
})
export class QualificationsComponent {
  constructor(private authService: AuthService) {

  }
}
