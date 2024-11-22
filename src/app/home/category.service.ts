import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';  // URL de la API de categorías

  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  getCategories(): Observable<any[]> {
    const accessToken = localStorage.getItem('authToken');  // Obtener el token JWT desde el almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
