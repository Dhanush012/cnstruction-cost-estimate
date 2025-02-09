import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private apiUrl = 'http://localhost:8080/api/inputs';
  private inputIdSubject = new BehaviorSubject<number | null>(null);
  inputId$ = this.inputIdSubject.asObservable(); // Observable to track changes

  setInputId(id: number) {
    localStorage.setItem('inputId', id.toString()); // ✅ Save to local storage
    this.inputIdSubject.next(id);
  }
  
  getInputId(): number | null {
    const storedId = localStorage.getItem('inputId');
    return storedId ? +storedId : null;
  }// Base URL for the backend API

  constructor(private http: HttpClient) {}

  saveUserDetails(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, userDetails); // HTTP POST request to save form data
  }
}
