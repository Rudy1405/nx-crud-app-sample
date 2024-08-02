import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../shared/data-grid/data-grid.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { Store, Select  } from '@ngxs/store';
import { SetCurrentItem, AppState  } from '../shared/state/app.state';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, DataGridComponent, ModalComponent, ButtonModule, ConfirmationDialogComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
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

  @Select(AppState.getCurrentItem) currentItem$: Observable<any> | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentItem$?.subscribe(item => {
      if (item) {
        this.selectedCategory = item;
        this.showModal = true;
      }
    });
  }


  openModal(category?: any) {
    this.selectedCategory = category ? { ...category } : {};
    this.showModal = true;
    this.store.dispatch(new SetCurrentItem(this.selectedCategory));
  }

  saveCategory() {
    this.confirmMessage = 'Do you want to save the changes?';
    this.showConfirmDialog = true;
  }

  confirmSave() {
    // Save category logic
    this.showModal = false;
    this.store.dispatch(new SetCurrentItem(null));
  }

  deleteCategory(category: any) {
    this.selectedCategory = category;
    this.confirmMessage = 'Do you want to delete this category?';
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    // Delete category logic
    this.showConfirmDialog = false;
    this.store.dispatch(new SetCurrentItem(null));
  }
}
