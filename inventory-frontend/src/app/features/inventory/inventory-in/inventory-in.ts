import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory';

@Component({
  selector: 'app-inventory-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h3>Registrar Entrada de Producto</h3>
    <p class="text-muted mb-4">Aumenta el inventario del producto seleccionado.</p>
    
    <form [formGroup]="inForm" (ngSubmit)="onSubmit()">
      <div class="input-group">
        <label for="quantity">Cantidad a Ingresar</label>
        <input id="quantity" type="number" formControlName="quantity" min="1" />
        <div class="error-msg" *ngIf="inForm.get('quantity')?.touched && inForm.get('quantity')?.errors?.['min']">
          La cantidad debe ser mayor a 0
        </div>
        <div class="error-msg" *ngIf="error">
          {{ error }}
        </div>
      </div>
      
      <div class="actions mt-4">
        <button type="button" class="btn btn-outline" (click)="close.emit()">Cancelar</button>
        <button type="submit" class="btn btn-primary" [disabled]="isSubmitting || inForm.invalid">
          Confirmar Entrada
        </button>
      </div>
    </form>
  `,
  styles: [`
    .mb-4 { margin-bottom: 1rem; }
    .mt-4 { margin-top: 1rem; }
    .text-muted { color: var(--text-secondary); font-size: 0.875rem; }
    .actions { display: flex; justify-content: flex-end; gap: 1rem; }
    .error-msg { color: var(--danger-color); font-size: 0.75rem; margin-top: 0.25rem; }
  `]
})
export class InventoryInComponent {
  @Input() productId!: number;
  @Output() close = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);
  private inventoryService = inject(InventoryService);

  inForm: FormGroup = this.fb.group({
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  isSubmitting = false;
  error = '';

  onSubmit() {
    if (this.inForm.valid) {
      this.isSubmitting = true;
      this.error = '';
      const quantity = this.inForm.value.quantity;
      
      this.inventoryService.addStock(this.productId, quantity).subscribe({
        next: () => {
          this.close.emit();
        },
        error: (err) => {
          this.error = err.message || 'Error al actualizar inventario';
          this.isSubmitting = false;
        }
      });
    }
  }
}
