import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movement } from '../models/movement';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getMovements(filterType?: boolean | null): Observable<Movement[]> {
    return this.http.post<Movement[]>(`${environment.apiUrl}/inventario/obtener-todos`, {}, { headers: this.headers }).pipe(
      map(movements => {
        // Ordenar del más reciente al más antiguo
        const sorted = movements.sort((a, b) => 
          new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime()
        );
        
        if (filterType !== null && filterType !== undefined) {
          return sorted.filter(m => m.tipoMovimiento === filterType);
        }
        return sorted;
      })
    );
  }
}
