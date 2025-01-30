import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-footer',
  standalone: true,
  imports: [],
  templateUrl: './logout-footer.component.html',
  styleUrl: './logout-footer.component.css'
})
export class LogoutFooterComponent {

  constructor(private router: Router) {
  }

  logout() {
    // Platzhalter
    this.router.navigate(['/login']);
  }
}
