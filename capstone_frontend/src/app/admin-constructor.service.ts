import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminConstructorService {

  private apiUrl = 'http://localhost:9093/api/constructors';  // Adjust the URL based on your Constructor microservice

  constructor(private http: HttpClient) {}

  getAllConstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
