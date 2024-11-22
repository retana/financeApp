import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Ajusta la ruta según tu proyecto

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private apiUrl = 'http://localhost:3000/transactions';  // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // Obtener transacciones de un usuario mediante el token de autenticación
  getTransactions(userId: number, accessToken: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }
  addTransaction(transaction: any): Observable<any> {
    const accessToken = localStorage.getItem('authToken');  // Asegúrate de obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(this.apiUrl, transaction, { headers });
  }

  updateTransaction(id: number, transaction: any): Observable<any> {
    const accessToken = localStorage.getItem('authToken');  // Asegúrate de obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put(`${this.apiUrl}/${id}`, transaction, { headers });
  }

  getTransactionById(id: number): Observable<any> {
    const accessToken = localStorage.getItem('authToken');  // Asegúrate de obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

   // Obtener estadísticas por categorías
   getCategoryStats(): Observable<any> {
    const accessToken = localStorage.getItem('authToken');  // Asegúrate de obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.apiUrl}/category-stats`, { headers });
  }
}
