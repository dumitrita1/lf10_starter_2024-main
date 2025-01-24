import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakAuth: Keycloak;

  constructor(private http: HttpClient) {
    this.keycloakAuth = new Keycloak({
      url: 'http://localhost:8089/auth',
      realm: 'your-realm',
      clientId: 'your-client-id'
    });
  }

  init(): Promise<any> {
    return this.keycloakAuth.init({ onLoad: 'login-required' });
  }

  isLoggedIn(): boolean {
    return this.keycloakAuth.authenticated || false;
  }

  getToken(): Promise<string> {
    const url = 'http://authproxy.szut.dev';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=password&client_id=employee-management-service&username=user&password=test';

    return lastValueFrom(this.http.post<any>(url, body, { headers }))
      .then(response => response.access_token)
      .catch(error => Promise.reject('No token available'));
  }

  logout(): void {
    this.keycloakAuth.logout();
  }


  // Add other methods to manage Keycloak authentication
}
