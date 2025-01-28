import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role: string = '';

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.loggedIn.next(true);
      this.role = 'admin';
      return true;
    } else if (username === 'user' && password === 'user123') {
      this.loggedIn.next(true);
      this.role = 'user';
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  getRole(): string {
    return this.role;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.role = '';
  }
}
