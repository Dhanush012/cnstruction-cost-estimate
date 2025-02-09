import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportResponseDto } from './models/report-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportserviceService {
  private apiUrl = 'http://localhost:9093/api/constructors';  // Replace with your backend URL
  private baseUrl = 'http://localhost:8084/api/reports';  
  private userInputUrl = 'http://localhost:8080/api/userInputs';

  constructor(private http: HttpClient) {}

  getInputById(): Observable<number> {
    return this.http.get<number>(`${this.userInputUrl}/getid`);
  }
  // Method to fetch all constructors
  getConstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Method to fetch the report data for a given constructor ID
  getReport(inputId: number): Observable<ReportResponseDto> {
    return this.http.get<ReportResponseDto>(`${this.baseUrl}/${inputId}`);
  }

  // Method to generate PDF for the selected constructor
  generatePdf(inputId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${inputId}/pdf`, { responseType: 'blob' });
  }
}
