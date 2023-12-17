import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  numberAttribute,
} from '@angular/core';
import { TColumnComponent } from '../column/t-column.component';
import { TData } from '../types';

export type TGridPaginationChangeEvent = {
  currentPage: number;
  pageSize: number | null;
};

@Component({
  selector: 't-grid',
  standalone: true,
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.css'],
  imports: [CommonModule],
})
export class TGridComponent<T extends TData> {
  // Inputs
  @Input({ required: true }) data!: T[];
  @Input() sortable: boolean = false;
  @Input({ transform: numberAttribute }) pageSize: number | null = null;
  @ContentChildren(TColumnComponent) columns!: QueryList<TColumnComponent<T>>;

  // Outputs
  @Output() paginationChange = new EventEmitter<TGridPaginationChangeEvent>();

  // Internal
  _pageCursor: number = 0;

  get totalPages() {
    if (this.pageSize === null) return 1;
    return Math.ceil(this.data.length / this.pageSize);
  }

  private changePage = (newPageRaw: number) => {
    const targetPage = Math.min(Math.max(newPageRaw, 0), this.totalPages - 1);
    if (targetPage === this._pageCursor) return;

    this._pageCursor = targetPage;
    this.paginationChange.emit({
      currentPage: this._pageCursor,
      pageSize: this.pageSize,
    });
  };

  paginationFirstPage() {
    this.changePage(0);
  }
  paginationPreviousPage() {
    this.changePage(this._pageCursor - 1);
  }
  paginationNextPage() {
    this.changePage(this._pageCursor + 1);
  }
  paginationLastPage() {
    this.changePage(this.totalPages - 1);
  }
}
