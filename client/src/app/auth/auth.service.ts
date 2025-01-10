import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor() { }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthState() {
    return this.authState.asObservable();
  }

  getRole(): string | null {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const decodedToken: any = jwtDecode(authToken);
        return decodedToken.role;
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserName(): string {
    try {
      return localStorage.getItem('userName') || '';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return '';
    }
  }

  async register(user: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, user);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  async login(credentials: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, credentials);
      this.authState.next(true);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(false);
  }
}