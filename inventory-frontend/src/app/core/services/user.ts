import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  listar(): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}/listar`, {}, { headers: this.headers });
  }

  buscar(idUsuario: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/buscar`, { idUsuario }, { headers: this.headers });
  }

  guardar(usuario: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/guardar`, usuario, { headers: this.headers });
  }

  actualizar(usuario: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/actualizar`, usuario, { headers: this.headers });
  }
}
