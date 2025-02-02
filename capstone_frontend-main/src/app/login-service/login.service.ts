import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8222/api/users/login'; // Adjust if needed
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  // Hardcoded admin credentials
  private adminCredentials = { email: 'admin@gmail.com', password: 'admin@123' };

  constructor(private http: HttpClient) {}

  // Login User
  loginUser(credentials: { email: string; password: string; role: string }): Observable<any> {
    // If the role is admin, check hardcoded credentials
    if (credentials.role === 'admin' && credentials.email === this.adminCredentials.email && credentials.password === this.adminCredentials.password) {
      // For admin, we mock a token and return an observable
      const adminToken = 'admin-token'; // This should be replaced with actual token generation
      localStorage.setItem('token', adminToken);
      this.authStatus.next(true);
      return new Observable(observer => {
        observer.next({ token: adminToken });
        observer.complete();
      });
    }

    // Otherwise, make the API call to log in
    return this.http.post(this.baseUrl, credentials).pipe(
      map((response: any) => {
        if (response.token) { // Ensure the backend sends 'token' not 'jwt'
          localStorage.setItem('token', response.token);
          this.authStatus.next(true);
        }
        return response;
      })
    );
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

  // Get User Role from JWT
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode<{ role: string }>(token);
      return decoded.role;
    }
    return null;
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
