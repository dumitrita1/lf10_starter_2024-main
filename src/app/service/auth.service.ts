import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private roleKey = 'userRole';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post('/api/login', { username, password }).subscribe((response: any) => {
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem(this.roleKey, response.role);
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.router.navigate(['/login']);
  }

  getRole(): string {
    return localStorage.getItem(this.roleKey) || '';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    // Add logic to check token expiry
    return !!token;
  }
}
