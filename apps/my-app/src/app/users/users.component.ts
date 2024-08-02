import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../shared/data-grid/data-grid.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { Store, Select } from '@ngxs/store';
import { SetCurrentItem, AppState } from '../shared/state/app.state';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DataGridComponent, ModalComponent, ButtonModule, ConfirmationDialogComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jade Smith', email: 'jade@example.com' }
  ];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' }
  ];

  showModal = false;
  showConfirmDialog = false;
  selectedUser: any = {};
  confirmMessage = '';

  @Select(AppState.getCurrentItem) currentItem$: Observable<any> | undefined;

  constructor(private store:Store){}

  //reopen the modal if there's an existing item being edited:
  ngOnInit() {
    this.currentItem$?.subscribe(item => {
      if (item) {
        this.selectedUser = item;
        this.showModal = true;
      }
    });
  }

  openModal(user?: any) {
    this.selectedUser = user ? { ...user } : {};
    this.showModal = true;
    this.store.dispatch(new SetCurrentItem(this.selectedUser))
  }

  saveUser() {
    // Save user logic
    this.confirmMessage = 'Do you want to save the changes?';
    this.showConfirmDialog = true;
  }

  confirmSave() {
    // Save user logic
    this.showModal = false;
    this.store.dispatch(new SetCurrentItem(null));
  }
  deleteUser(user: any) {
    this.selectedUser = user;
    this.confirmMessage = 'Do you want to delete this user?';
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    // Delete user logic
    this.showConfirmDialog = false;
    this.store.dispatch(new SetCurrentItem(null));
  }
}
