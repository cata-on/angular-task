import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TColumnComponent } from './t-column.component';

@Component({
  selector: 't-grid',
  standalone: true,
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.css'],
  imports: [CommonModule],
})
export class TGridComponent<TData extends Record<string, unknown>> {
  @Input({ required: true }) data!: TData[];
  @ContentChildren(TColumnComponent) columns!: QueryList<
    TColumnComponent<TData>
  >;
}
