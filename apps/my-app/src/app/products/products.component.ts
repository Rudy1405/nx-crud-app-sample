import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '@my-angular-app/shared/data-grid/data-grid.component';
import { ModalComponent } from '@my-angular-app/shared/modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { Store, Select } from '@ngxs/store';
import { SetCurrentItem, AppState } from '@my-angular-app/shared/state/app.state';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '@my-angular-app/shared/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DataGridComponent, ModalComponent, ButtonModule, ConfirmationDialogComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [
    { id: 1, name: 'Product A', category: 'Category 1', price: 100 },
    { id: 2, name: 'Product B', category: 'Category 2', price: 200 }
  ];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'price', header: 'Price' },
    { field: 'actions', header: 'Actions' }
  ];

  showModal = false;
  showConfirmDialog = false;
  selectedProduct: any = {};
  confirmMessage = '';
  productForm!: FormGroup;

  @Select(AppState.getCurrentItem) currentItem$: Observable<any> | undefined;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.currentItem$?.subscribe(item => {
      if (item) {
        this.selectedProduct = item;
        this.showModal = true;
        this.productForm.patchValue(this.selectedProduct);
      }
    });
  }

  openModal(product?: any) {
    this.selectedProduct = product ? { ...product } : {};
    this.showModal = true;
    this.productForm.reset(this.selectedProduct);
    this.store.dispatch(new SetCurrentItem(this.selectedProduct));
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.confirmMessage = 'Do you want to save the changes?';
      this.showConfirmDialog = true;
    }
  }

  confirmSave() {
    const updatedProduct = this.productForm.value;
    this.products = this.products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.showModal = false;
    this.store.dispatch(new SetCurrentItem(null));
  }

  deleteProduct(product: any) {
    this.selectedProduct = product;
    this.confirmMessage = 'Do you want to delete this product?';
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    this.products = this.products.filter(prod => prod.id !== this.selectedProduct.id);
    this.showConfirmDialog = false;
    this.store.dispatch(new SetCurrentItem(null));
  }
}
