import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  @Input() formConfig: { [key: string]: any } = {};
  form!: FormGroup;

  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.form = this.fb.group(this.formConfig);
  }

  save() {
    console.log('Form Data:', this.form.value);
  }

  hide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
