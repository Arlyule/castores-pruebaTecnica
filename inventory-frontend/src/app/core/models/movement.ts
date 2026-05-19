import { User } from './user';
import { Product } from './product';

export interface Movement {
  idInventario: number;
  cantidad: number;
  fechaRegistro: Date | string;
  tipoMovimiento: boolean; // true = entrada, false = salida
  usuario: User;
  productos: Product;
}
