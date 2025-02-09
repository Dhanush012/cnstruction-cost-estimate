import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface MaterialEstimator {
  materialId: number;
  inputId: number;
  resourceName: string;
  resourceQuantity: string;
  materialQuality: string;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})

export class MaterialService {
  private apiUrl = 'http://localhost:8083/api/materials'; 
  private userInputUrl = 'http://localhost:8080/api/userInputs';  // Replace with your backend API URL
  // // Update with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch material estimates by inputId
  getInputById(): Observable<number> {
    return this.http.get<number>(`${this.userInputUrl}/getid`);
  }
  // getMaterialId(): Observable<number> {
  //   return this.http.get<number>(`${this.apiUrl}/getLatestId`); // Adjust endpoint accordingly
  // }
  getMaterialEstimates(inputId: number): Observable<MaterialEstimator[]> {
    return this.http.get<MaterialEstimator[]>(`${this.apiUrl}/${inputId}`);
  }
}

