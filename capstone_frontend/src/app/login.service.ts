import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8001/auth'; // Adjust if needed
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  // Hardcoded admin credentials
  private adminCredentials = { email: 'admin@gmail.com', password: 'admin@123' };

  constructor(private http: HttpClient) {}

  // Login User
  // Modify the method signature to include role
  loginUser(credentials: { role: string; email: string; password: string }): Observable<any> {
    if (
      credentials.email === this.adminCredentials.email &&
      credentials.password === this.adminCredentials.password &&
      credentials.role === 'admin'
    ) {
      const adminToken = 'admin-token';
      this.storeToken(adminToken);
      return new Observable(observer => {
        observer.next({ token: adminToken });
        observer.complete();
      });
    }
  
    // For other roles, send login request to backend
    return this.http.post(`${this.baseUrl}`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          this.storeToken(response.token);
        }
        return response;
      })
    );
  }
  

  // Store Token in Local Storage
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.authStatus.next(true);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  // Check Authentication Status
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Get Stored JWT Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Observable for Auth Status
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // Check if Token Exists
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
