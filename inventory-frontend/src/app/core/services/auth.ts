import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'jwt_token';

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(correo: string, contrasena: string): Observable<any> {
    if (!correo || !contrasena) {
      return throwError(() => new Error('Correo y contraseña son requeridos.'));
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { correo, contrasena }, { headers }).pipe(
      tap(response => {
        if (response && response.token && response.usuario) {
          if (response.usuario.estatus === false) {
            throw new Error('Usuario inactivo.');
          }
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          this.currentUserSubject.next(response.usuario);
        }
      }),
      catchError(err => {
        console.error('Login error', err);
        let message = 'Credenciales incorrectas o error en el servidor.';

        if (err.error && err.error.error) {
          message = err.error.error;
        }

        return throwError(() => new Error(message));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  hasRole(expectedRole: string): boolean {
    const user = this.currentUser;
    return user ? user.rol?.nombre.toUpperCase() === expectedRole.toUpperCase() : false;
  }
}
