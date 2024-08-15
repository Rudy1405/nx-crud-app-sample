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
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, DataGridComponent, ModalComponent, ButtonModule, ConfirmationDialogComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
  ];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' }
  ];

  showModal = false;
  showConfirmDialog = false;
  selectedCategory: any = {};
  confirmMessage = '';
  categoryForm!: FormGroup;

  @Select(AppState.getCurrentItem) currentItem$: Observable<any> | undefined;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });

    this.currentItem$?.subscribe(item => {
      if (item) {
        this.selectedCategory = item;
        this.showModal = true;
        this.categoryForm.patchValue(this.selectedCategory);
      }
    });
  }

  openModal(category?: any) {
    this.selectedCategory = category ? { ...category } : {};
    this.showModal = true;
    this.categoryForm.reset(this.selectedCategory);
    this.store.dispatch(new SetCurrentItem(this.selectedCategory));
  }
  

  saveCategory() {
    if (this.categoryForm.valid) {
      this.confirmMessage = 'Do you want to save the changes?';
      this.showConfirmDialog = true;
    }
  }

  confirmSave() {
    this.showModal = false;
    this.store.dispatch(new SetCurrentItem(null));
  }

  deleteCategory(category: any) {
    this.selectedCategory = category;
    this.confirmMessage = 'Do you want to delete this category?';
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    this.categories = this.categories.filter(cat => cat.id !== this.selectedCategory.id);
    this.showConfirmDialog = false;
    this.store.dispatch(new SetCurrentItem(null));
  }
}
