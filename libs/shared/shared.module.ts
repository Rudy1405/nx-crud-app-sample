import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { ModalComponent } from './modal/modal.component';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppState } from './state/app.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [ConfirmationDialogComponent,DataGridComponent, ModalComponent],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    NgxsModule.forFeature([AppState])
  ],
  exports: [
    ConfirmationDialogComponent,
    DataGridComponent,
    ModalComponent
  ]
})
export class SharedModule { }
