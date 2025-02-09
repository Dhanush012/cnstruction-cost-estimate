import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8001/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  // ✅ Register User
  registerUser(userData: { username: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // ✅ Login User
  loginUser(data: { role: string; email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}`, data);
  }
  

  storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.authStatus.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode<{ role: string }>(token);
      return decoded.role || null;
    }
    return null;
  }
}
