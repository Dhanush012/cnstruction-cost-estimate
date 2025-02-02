import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostestimateService {

  private baseUrl = 'http://localhost:8222/api/cost-estimates';

  constructor(private http: HttpClient) {}

  // Save user details to the backend
  saveUserDetails(userDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inputs`, userDetails);
  }

  // Calculate cost by input ID
  calculateCost(inputId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cost-estimates/calculate/${inputId}`);
  }
}
