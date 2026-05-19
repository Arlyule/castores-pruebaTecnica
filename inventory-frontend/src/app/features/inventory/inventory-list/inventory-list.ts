import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../../core/services/inventory';
import { AuthService } from '../../../core/services/auth';
import { Product } from '../../../core/models/product';
import { MovementFormComponent } from '../movement-form/movement-form';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, MovementFormComponent],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.scss'
})
export class InventoryListComponent implements OnInit {
  inventoryService = inject(InventoryService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  isLoading = true;

  showMovementForm = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.inventoryService.getProducts().subscribe(products => {
      this.products = products.filter(p => p.estatus);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  toggleStatus(product: Product) {
    this.inventoryService.updateStatus(product.idProductos).subscribe(() => {
      this.loadProducts();
    });
  }
}
