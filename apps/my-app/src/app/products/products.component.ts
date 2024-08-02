import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../shared/data-grid/data-grid.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { Store, Select  } from '@ngxs/store';
import { SetCurrentItem, AppState } from '../shared/state/app.state';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DataGridComponent, ModalComponent, ButtonModule, ConfirmationDialogComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products = [
    { id: 1, name: 'Product A', category: 'Category 1' },
    { id: 2, name: 'Product B', category: 'Category 2' }
  ];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' }
  ];

  showModal = false;
  showConfirmDialog = false;
  selectedProduct: any = {};
  confirmMessage = '';


  @Select(AppState.getCurrentItem) currentItem$: Observable<any> | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentItem$?.subscribe(item => {
      if (item) {
        this.selectedProduct = item;
        this.showModal = true;
      }
    });
  }

  openModal(product?: any) {
    this.selectedProduct = product ? { ...product } : {};
    this.showModal = true;
    this.store.dispatch(new SetCurrentItem(this.selectedProduct));
  }

  saveProduct() {
    // Save product logic
    this.confirmMessage = 'Do you want to save the changes?';
    this.showConfirmDialog = true;
  }

  confirmSave() {
    // Save product logic
    this.showModal = false;
    this.store.dispatch(new SetCurrentItem(null));
  }

}
