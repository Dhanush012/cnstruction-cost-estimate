import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportserviceService {
  private apiUrl = 'http://localhost:8222/api/reports'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getConstructors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/constructors`);
  }

  getReportData(constructorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/report/${constructorId}`);
  }
}
