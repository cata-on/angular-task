import { CommonModule, SlicePipe } from '@angular/common';
import { Observable, isObservable } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  numberAttribute,
} from '@angular/core';

import { Direction, TData } from '../types';
import { TColumnComponent } from '../column/t-column.component';
import { THeadCellComponent } from '../header/t-head-cell.component';
import { TPaginationComponent } from '../pagination/t-pagination.component';
import { CursorPipe } from '../data-pipes/Cursor.pipe';
import { PageCountPipe } from '../data-pipes/PageCount.pipe';
import { OrderPipe } from '../data-pipes/Order.pipe';
import { IndefiniteLoaderComponent } from '../../indefinite-loader/indefinite-loader.component';

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
  imports: [
    CommonModule,
    THeadCellComponent,
    TPaginationComponent,
    IndefiniteLoaderComponent,
    SlicePipe,
    CursorPipe,
    PageCountPipe,
    OrderPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TGridComponent<T extends TData> implements OnInit, OnChanges {
  // Inputs
  @Input({ required: true }) data!: T[] | Observable<T[]>;
  @Input() sortable: boolean = false;
  @Input({ transform: numberAttribute }) pageSize: number | null = null;
  @ContentChildren(TColumnComponent) columns!: QueryList<TColumnComponent<T>>;

  // Outputs
  @Output() paginationChange = new EventEmitter<TGridPaginationChangeEvent>();
  @Output() sortChange = new EventEmitter<TGridSortChangeEvent<T>>();

  // Internal
  _data: T[] = [];
  _pageCursor: number = 0;
  _sortColumnName: keyof T | null = null;
  _sortDirection: Direction | null = null;
  isLoading: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (isObservable(this.data)) {
      this.isLoading = true;
      this.data.subscribe((data) => {
        this._data = data;
        this.isLoading = false;
        this.ref.markForCheck();
      });
    } else {
      this._data = this.data;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['pageSize'];
    if (!change.firstChange && change.currentValue !== change.previousValue) {
      const totalPages = change.currentValue
        ? Math.ceil(this._data.length / change.currentValue)
        : 1;

      if (this._pageCursor >= totalPages) {
        this._pageCursor = totalPages - 1;
      }
    }
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

  handlePageChange = (targetPage: number) => {
    if (targetPage === this._pageCursor) return;

    this._pageCursor = targetPage;
    this.paginationChange.emit({
      currentPage: this._pageCursor,
      pageSize: this.pageSize,
    });
  };
}
