import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private apiUrl = 'http://localhost:8090/api/inputs'; // Base URL for the backend API

  constructor(private http: HttpClient) {}

  saveUserDetails(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, userDetails); // HTTP POST request to save form data
  }
}
