import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.getStoredAuth());
  private role: string = this.getStoredRole();

  constructor() {
    this.loggedIn.next(this.getStoredAuth());
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.setAuth(true, 'admin');
      return true;
    } else if (username === 'user' && password === 'user123') {
      this.setAuth(true, 'user');
      return true;
    }
    return false;
  }

  private setAuth(isLoggedIn: boolean, role: string) {
    this.loggedIn.next(isLoggedIn);
    this.role = role;
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('role', role);
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  getRole(): string {
    return this.role;
  }

  logout(): void {
    this.setAuth(false, '');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  }

  private getStoredAuth(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }

  private getStoredRole(): string {
    return localStorage.getItem('role') || '';
  }
}
