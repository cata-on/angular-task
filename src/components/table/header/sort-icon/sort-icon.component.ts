import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Direction } from '../../types';

@Component({
  selector: 'sort-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sort-icon.component.html',
  styles: [
    `
      :host {
        display: flex;
      }

      .icon {
        width: 1em;
        height: 1em;
      }

      .icon-path {
        transition-property: d;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);
      }

      .icon-path-hover {
        color: var(--cell-hover-icon-color);
        transition-property: color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);
      }
    `,
  ],
})
export class SortIconComponent {
  @Input() direction: Direction | null = null;
  Direction = Direction;
}
