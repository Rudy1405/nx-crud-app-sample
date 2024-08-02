import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule,  DialogModule, ButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent {
  private _visible = false;

  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this._visible);
  }

  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() message = 'Are you sure?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  hide() {
    this.visible = false;
    this.cancel.emit();
  }

  confirmAction() {
    this.visible = false;
    this.confirm.emit();
  }
}
