import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

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
    return this.keycloakAuth.init({
      onLoad: 'login-required',
      checkLoginIframe: false // Disable iframe checks which can cause CORS issues
    });
  }

  isLoggedIn(): boolean {
    return this.keycloakAuth.authenticated || false;
  }

  getToken(): Promise<string> {
    const url = 'https://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/token';

    // Set up headers properly for the token request
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    const body = new URLSearchParams({
      grant_type: 'password',
      client_id: 'employee-management-service',
      username: 'user',
      password: 'test'
    }).toString();

    return lastValueFrom(
      this.http.post<any>(url, body, {
        headers,
        withCredentials: true // Enable sending credentials if needed
      })
    ).then(response => {
      if (response && response.access_token) {
        console.log('Token retrieved:', response.access_token);
        return response.access_token;
      }
      throw new Error('Invalid token response');
    }).catch(error => {
      console.error('Token retrieval failed:', error);
      return Promise.reject('No token available');
    });
  }

  logout(): void {
    this.keycloakAuth.logout();
  }
}
