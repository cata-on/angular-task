import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Direction } from '../types';

@Component({
  selector: 't-head-cell',
  standalone: true,
  templateUrl: './t-head-cell.component.html',
  styleUrl: './t-head-cell.component.css',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class THeadCellComponent {
  @Input() sortDirection: Direction | null = null;
  @Input() disabled: boolean = false;
  @Output() sortChange = new EventEmitter<{ direction: Direction }>();

  get sortDirectionArrow() {
    switch (this.sortDirection) {
      case null:
        return '';
      case Direction.ASC:
        return '↑';
      case Direction.DESC:
        return '↓';
    }
  }

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
