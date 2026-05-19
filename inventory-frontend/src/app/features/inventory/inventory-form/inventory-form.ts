import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h3>Agregar Nuevo Producto</h3>
    <p class="text-muted mb-4">La cantidad inicial será 0 por defecto.</p>
    
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <div class="input-group">
        <label for="nombreProducto">Nombre del Producto</label>
        <input id="nombreProducto" formControlName="nombreProducto" placeholder="Ej. Teclado Inalámbrico" />
        <div class="error-msg" *ngIf="productForm.get('nombreProducto')?.touched && productForm.get('nombreProducto')?.errors?.['required']">
          El nombre es requerido
        </div>
      </div>
      
      <div class="input-group">
        <label for="descripcion">Descripción</label>
        <input id="descripcion" formControlName="descripcion" placeholder="Breve descripción" />
      </div>
      
      <div class="actions mt-4">
        <button type="button" class="btn btn-outline" (click)="close.emit()">Cancelar</button>
        <button type="submit" class="btn btn-primary" [disabled]="isSubmitting || productForm.invalid">
          Guardar Producto
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
export class InventoryFormComponent {
  @Output() close = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);
  private inventoryService = inject(InventoryService);

  productForm: FormGroup = this.fb.group({
    nombreProducto: ['', Validators.required],
    descripcion: ['']
  });

  isSubmitting = false;

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      const { nombreProducto, descripcion } = this.productForm.value;
      
      this.inventoryService.addProduct(nombreProducto, descripcion).subscribe({
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
}
