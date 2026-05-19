import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { HistoryService } from './history';
import { AuthService } from './auth';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private historyService = inject(HistoryService);
  private authService = inject(AuthService);
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getProducts(): Observable<Product[]> {
    return forkJoin({
      products: this.http.post<Product[]>(`${environment.apiUrl}/producto/listar`, {}, { headers: this.headers }),
      movements: this.historyService.getMovements(null)
    }).pipe(
      map(({ products, movements }) => {
        return products.map(product => {
          // Calculate stock for each product based on movements
          let stock = 0;
          const productMovements = movements.filter(m => m.productos.idProductos === product.idProductos);
          
          productMovements.forEach(m => {
            if (m.tipoMovimiento === true) {
              stock += m.cantidad; // Entrada
            } else {
              stock -= m.cantidad; // Salida
            }
          });
          
          return { ...product, stock };
        });
      })
    );
  }

  addProduct(nombreProducto: string, descripcion: string): Observable<Product> {
    const newProduct = {
      nombreProducto,
      descripcion,
      precio: 0,
      estatus: true
    };
    
    return this.http.post<Product>(`${environment.apiUrl}/producto/guardar`, newProduct, { headers: this.headers });
  }

  updateStatus(idProductos: number): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/producto/cambiar-estatus`, { id: idProductos }, { headers: this.headers });
  }

  addStock(idProductos: number, cantidad: number): Observable<any> {
    if (cantidad <= 0) return throwError(() => new Error('La cantidad debe ser mayor a 0'));
    
    const user = this.authService.currentUser;
    if (!user) return throwError(() => new Error('Usuario no autenticado'));

    const newMovement = {
      cantidad,
      fechaRegistro: new Date().toISOString(),
      tipoMovimiento: true, // Entrada
      usuario: { idUsuario: user.idUsuario },
      productos: { idProductos }
    };

    return this.http.post(`${environment.apiUrl}/inventario/guardar`, newMovement, { headers: this.headers });
  }

  removeStock(idProductos: number, cantidad: number): Observable<any> {
    if (cantidad <= 0) return throwError(() => new Error('La cantidad debe ser mayor a 0'));
    
    const user = this.authService.currentUser;
    if (!user) return throwError(() => new Error('Usuario no autenticado'));

    const newMovement = {
      cantidad,
      fechaRegistro: new Date().toISOString(),
      tipoMovimiento: false, // Salida
      usuario: { idUsuario: user.idUsuario },
      productos: { idProductos }
    };

    return this.http.post(`${environment.apiUrl}/inventario/guardar`, newMovement, { headers: this.headers });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/producto/actualizar`, product, { headers: this.headers });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/producto/buscar`, { id }, { headers: this.headers });
  }

  getInventoryById(idInventario: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/inventario/obtener`, { idInventario }, { headers: this.headers });
  }

  updateInventory(inventory: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/inventario/actualizar`, inventory, { headers: this.headers });
  }
}
