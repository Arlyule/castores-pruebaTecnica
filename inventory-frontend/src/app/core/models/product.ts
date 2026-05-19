export interface Product {
  idProductos: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  estatus: boolean;
  
  // Campo calculado en frontend
  stock?: number;
}
