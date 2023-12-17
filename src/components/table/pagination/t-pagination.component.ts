import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 't-pagination',
  standalone: true,
  templateUrl: './t-pagination.component.html',
  styleUrl: './t-pagination.component.css',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TPaginationComponent {
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;
  @Output() paginationChange = new EventEmitter<number>();

  paginationFirstPage() {
    this.paginationChange.emit(0);
  }
  paginationPreviousPage() {
    this.paginationChange.emit(this.currentPage - 1);
  }
  paginationNextPage() {
    this.paginationChange.emit(this.currentPage + 1);
  }
  paginationLastPage() {
    this.paginationChange.emit(this.totalPages - 1);
  }
}
