import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { LogoutFooterComponent } from "../employee-details/logout-footer/logout-footer.component";
import {AppAdminComponent} from "../Admin/app-admin/app-admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, LogoutFooterComponent, AppAdminComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lf10StarterNew';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.checkIfLoginPage();
    });

    this.checkIfLoginPage();
  }

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  private checkIfLoginPage(): void {
    const navbar = this.el.nativeElement.querySelector('app-navbar');
    const footer = this.el.nativeElement.querySelector('app-logout-footer');
    if (this.isLoginPage) {
      this.renderer.setStyle(navbar, 'display', 'none');
      this.renderer.setStyle(footer, 'display', 'none');
    } else {
      this.renderer.setStyle(navbar, 'display', 'block');
      this.renderer.setStyle(footer, 'display', 'block');
    }
  }
}
