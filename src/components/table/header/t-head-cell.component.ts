import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Direction } from '../types';
import { SortIconComponent } from './sort-icon/sort-icon.component';

@Component({
  selector: 't-head-cell',
  standalone: true,
  templateUrl: './t-head-cell.component.html',
  styleUrl: './t-head-cell.component.css',
  imports: [CommonModule, SortIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class THeadCellComponent {
  @Input() sortDirection: Direction | null = null;
  @Input() disabled: boolean = false;
  @Output() sortChange = new EventEmitter<{ direction: Direction }>();

  get otherDirection() {
    switch (this.sortDirection) {
      case Direction.ASC:
        return Direction.DESC;
      case null:
      case Direction.DESC:
        return Direction.ASC;
    }
  }
}
