import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() visible = false;
  @Input() header = '';
  @Input() content = '';

  @Output() visibleChange = new EventEmitter<boolean>();
  
  hide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
