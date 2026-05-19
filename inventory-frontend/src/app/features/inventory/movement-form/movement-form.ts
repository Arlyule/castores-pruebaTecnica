import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory';
import { AuthService } from '../../../core/services/auth';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-movement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movement-form.html',
  styleUrl: './movement-form.scss'
})
export class MovementFormComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);
  private inventoryService = inject(InventoryService);
  public authService = inject(AuthService);

  movementForm: FormGroup = this.fb.group({
    productId: ['', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    tipoMovimiento: ['entrada', Validators.required]
  });

  products: Product[] = [];
  isLoadingProducts = true;
  isSubmitting = false;

  error = '';

  ngOnInit(): void {
    this.loadProducts();
    this.setDefaultMovementType();
  }

  loadProducts() {
    this.inventoryService.getProducts().subscribe(products => {
      this.products = products.filter(p => p.estatus); // Solo productos activos
      this.isLoadingProducts = false;
    });
  }

  get selectedProduct(): Product | undefined {
    const id = this.movementForm.get('productId')?.value;
    return this.products.find(p => p.idProductos === +id);
  }

  setDefaultMovementType() {
    if (this.authService.hasRole('ALMACEN')) {
      this.movementForm.get('tipoMovimiento')?.setValue('salida');
    } else {
      this.movementForm.get('tipoMovimiento')?.setValue('entrada');
    }
  }

  onSubmit() {
    this.error = '';
    const { productId, cantidad, tipoMovimiento } = this.movementForm.value;
    
    if (!productId) {
      this.error = 'Debes seleccionar un producto.';
      return;
    }
    
    if (!cantidad || cantidad <= 0) {
      this.error = 'La cantidad debe ser mayor a 0.';
      return;
    }
    
    if (tipoMovimiento === 'salida') {
      const product = this.selectedProduct;
      if (product && cantidad > (product.stock || 0)) {
        this.error = 'La cantidad de salida no puede ser mayor al stock actual.';
        return;
      }
    }
    
    this.isSubmitting = true;
    const obs = tipoMovimiento === 'entrada' 
      ? this.inventoryService.addStock(productId, cantidad)
      : this.inventoryService.removeStock(productId, cantidad);

    obs.subscribe({
        next: () => {
          this.close.emit();
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
        }
      });
  }
}
