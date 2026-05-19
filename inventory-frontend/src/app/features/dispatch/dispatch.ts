import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../core/services/inventory';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-dispatch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dispatch.html',
  styleUrl: './dispatch.scss'
})
export class DispatchComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private fb = inject(FormBuilder);

  activeProducts: Product[] = [];
  isLoading = true;
  
  dispatchForm: FormGroup = this.fb.group({
    productId: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  selectedProduct: Product | undefined;
  error = '';
  success = '';
  isSubmitting = false;

  ngOnInit(): void {
    this.loadActiveProducts();
    
    this.dispatchForm.get('productId')?.valueChanges.subscribe(id => {
      this.selectedProduct = this.activeProducts.find(p => p.idProductos === Number(id));
      this.error = '';
      this.success = '';
    });
  }

  loadActiveProducts() {
    this.inventoryService.getProducts().subscribe(products => {
      // Solo productos activos
      this.activeProducts = products.filter(p => p.estatus);
      this.isLoading = false;
      
      // Actualizar el producto seleccionado si cambió su stock
      if (this.selectedProduct) {
        this.selectedProduct = this.activeProducts.find(p => p.idProductos === this.selectedProduct?.idProductos);
      }
    });
  }

  onSubmit() {
    if (this.dispatchForm.valid && this.selectedProduct) {
      const quantity = this.dispatchForm.value.quantity;
      
      if (quantity > (this.selectedProduct.stock || 0)) {
        this.error = 'No se puede sacar una cantidad mayor a la que está en inventario.';
        return;
      }

      this.isSubmitting = true;
      this.error = '';
      this.success = '';

      this.inventoryService.removeStock(this.selectedProduct.idProductos, quantity).subscribe({
        next: () => {
          this.success = 'Salida de inventario registrada con éxito.';
          this.dispatchForm.patchValue({ quantity: 1 });
          this.loadActiveProducts();
        },
        error: (err) => {
          this.error = err.message || 'Error al registrar salida.';
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
