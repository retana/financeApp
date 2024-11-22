// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';  // Asegúrate de que esta URL esté correcta

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { username: email, password: password };  // En tu API se espera "username" en lugar de "email"
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
