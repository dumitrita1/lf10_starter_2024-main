import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      const role = this.authService.getRole();
      if (role === 'admin') {
        this.router.navigate(['/employee-list']);
      } else {
        this.router.navigate(['/employee-list']);
      }
    } else {
      this.errorMessage = 'Invalid username or password';
      this.showError = true;
    }
  }
}
