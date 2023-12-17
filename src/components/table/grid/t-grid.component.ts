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
import { Direction, TData } from '../types';
import { THeadCellComponent } from '../header/t-head-cell.component';
import { TPaginationComponent } from '../pagination/t-pagination.component';

export type TGridPaginationChangeEvent = {
  currentPage: number;
  pageSize: number | null;
};

export type TGridSortChangeEvent<T extends TData> = {
  columnName: keyof T;
  direction: Direction;
};

@Component({
  selector: 't-grid',
  standalone: true,
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.css'],
  imports: [CommonModule, THeadCellComponent, TPaginationComponent],
})
export class TGridComponent<T extends TData> {
  // Inputs
  @Input({ required: true }) data!: T[];
  @Input() sortable: boolean = false;
  @Input({ transform: numberAttribute }) pageSize: number | null = null;
  @ContentChildren(TColumnComponent) columns!: QueryList<TColumnComponent<T>>;

  // Outputs
  @Output() paginationChange = new EventEmitter<TGridPaginationChangeEvent>();
  @Output() sortChange = new EventEmitter<TGridSortChangeEvent<T>>();

  // Internal
  _pageCursor: number = 0;
  _sortColumnName: keyof T | null = null;
  _sortDirection: Direction | null = null;

  private getSortedData() {
    if (!this.sortable) return this.data;
    if (!this._sortColumnName || !this._sortDirection) return this.data;

    const columnName = this._sortColumnName;
    const dataCopy = [...this.data];

    dataCopy.sort((a, b) => {
      const aValue = a[columnName];
      const bValue = b[columnName];
      if (aValue > bValue)
        return this._sortDirection === Direction.ASC ? 1 : -1;
      if (aValue < bValue)
        return this._sortDirection === Direction.ASC ? -1 : 1;

      return 0;
    });

    return dataCopy;
  }

  // Available to the template
  get totalPages() {
    if (this.pageSize === null) return 1;
    return Math.ceil(this.data.length / this.pageSize);
  }

  get shouldShowPagination() {
    return this.pageSize !== null && this.totalPages > 1;
  }

  get dataInCursor() {
    if (this.pageSize === null) return this.data;
    const start = this._pageCursor * this.pageSize;
    const end = start + this.pageSize;
    return this.getSortedData().slice(start, end);
  }

  handleSortChange(columnName: keyof T, direction: Direction) {
    if (!this.sortable) return;

    this._sortColumnName = columnName;
    this._sortDirection = direction;

    this.sortChange.emit({
      columnName: this._sortColumnName,
      direction: this._sortDirection,
    });
  }

  handlePageChange = (newPageRaw: number) => {
    const targetPage = Math.min(Math.max(newPageRaw, 0), this.totalPages - 1);
    if (targetPage === this._pageCursor) return;

    this._pageCursor = targetPage;
    this.paginationChange.emit({
      currentPage: this._pageCursor,
      pageSize: this.pageSize,
    });
  };
}
