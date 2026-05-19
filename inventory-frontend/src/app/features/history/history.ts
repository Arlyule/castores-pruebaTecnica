import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryService } from '../../core/services/history';
import { Movement } from '../../core/models/movement';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class HistoryComponent implements OnInit {
  private historyService = inject(HistoryService);
  private cdr = inject(ChangeDetectorRef);

  movements: Movement[] = [];
  isLoading = true;
  filterValue: string = ''; // 'true' for Entrada, 'false' for Salida, '' for all
  selectedDate: string = '';

  // Pagination
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadMovements();
  }

  loadMovements() {
    this.isLoading = true;
    let filter: boolean | null = null;
    if (this.filterValue === 'true') filter = true;
    if (this.filterValue === 'false') filter = false;

    this.historyService.getMovements(filter).subscribe(data => {
      let filteredData = data;
      
      // Apply date filter if selected
      if (this.selectedDate) {
        filteredData = data.filter(m => {
          const movementDate = new Date(m.fechaRegistro).toISOString().split('T')[0];
          return movementDate === this.selectedDate;
        });
      }

      this.movements = filteredData.sort((a, b) => b.idInventario - a.idInventario);
      this.isLoading = false;
      this.currentPage = 1; // Reset to first page on reload/filter
      this.cdr.detectChanges();
    });
  }

  onFilterChange() {
    this.loadMovements();
  }

  get pagedMovements(): Movement[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.movements.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.movements.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cdr.detectChanges();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cdr.detectChanges();
    }
  }
}
