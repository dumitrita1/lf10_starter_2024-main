import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.getRole() === 'admin';
  }

  toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu?.classList.toggle('active');
  }
}

