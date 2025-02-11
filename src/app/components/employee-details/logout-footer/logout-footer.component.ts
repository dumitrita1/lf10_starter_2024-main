import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-logout-footer',
  standalone: true,
  imports: [],
  templateUrl: './logout-footer.component.html',
  styleUrls: ['./logout-footer.component.css']
})
export class LogoutFooterComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
