import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css',
})
export class DataGridComponent {
  @Input()
  data: any[] = [];
  @Input()
  columns: any[] = [];
}
