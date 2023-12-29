import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const degToRad = (deg: number) => deg * (Math.PI / 180);

@Component({
  selector: 't-progress',
  standalone: true,
  templateUrl: './t-progress.component.html',
  styles: [
    `
      .progress-svg {
        transition-property: color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);
      }
    `,
  ],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TProgressComponent {
  @Input({ required: true }) radius!: number;
  @Input({ required: true }) progress!: number;
  @Input({ required: true }) color!: string;

  get sanitizedRadius(): number {
    return Math.max(this.radius, 50);
  }

  get sanitizedProgress(): number {
    return Math.max(Math.min(this.progress, 100), 0);
  }

  get angleDeg(): number {
    // Subtract 90deg to start from the center/top instead of right/center
    return (this.sanitizedProgress / 100) * 360 - 90;
  }

  get angleRad(): number {
    return degToRad(this.angleDeg);
  }

  get path(): string {
    const rad = this.sanitizedRadius;
    const path = [];

    // Start at the center/center
    path.push('M', rad, rad);

    // Move to center/top
    path.push('L', rad, 0);

    // Draw the arc to the target percentage point

    // Calculate x, y coordinates
    const targetX = this.sanitizedRadius * (1 + Math.cos(this.angleRad));
    const targetY = this.sanitizedRadius * (1 + Math.sin(this.angleRad));
    const sweepFlag = 1;
    const largeArcFlag = this.angleDeg > 90 ? 1 : 0;

    path.push('A', rad, rad, 0, largeArcFlag, sweepFlag, targetX, targetY);

    // Move back to the center and close the path
    path.push('L', rad, rad, 'Z');

    return path.join(' ');
  }
}
