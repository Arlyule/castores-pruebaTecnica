import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../core/services/inventory';
import { AuthService } from '../../core/services/auth';
import { Product } from '../../core/models/product';
import { InventoryFormComponent } from '../inventory/inventory-form/inventory-form';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InventoryFormComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  inventoryService = inject(InventoryService);
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  isLoading = true;
  showAddForm = false;
  showEditForm = false;
  
  editForm: FormGroup = this.fb.group({
    idProductos: [null],
    nombreProducto: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    estatus: [true, Validators.required]
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.inventoryService.getProducts().subscribe(products => {
      this.products = products;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  openEditModal(product: Product) {
    this.editForm.patchValue(product);
    this.showEditForm = true;
    this.cdr.detectChanges();
  }

  onEditSubmit() {
    if (this.editForm.valid) {
      const updatedProduct = this.editForm.value;
      this.inventoryService.updateProduct(updatedProduct).subscribe(() => {
        this.showEditForm = false;
        this.loadProducts();
      });
    }
  }
}
