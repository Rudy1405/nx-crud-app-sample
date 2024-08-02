import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { ModalComponent } from './modal/modal.component';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    DataGridComponent,
    ModalComponent
  ]
})
export class SharedModule { }
