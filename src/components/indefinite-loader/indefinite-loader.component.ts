import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TProgressComponent } from '../progress/t-progress.component';

export enum LoaderSize {
  LARGE = 400,
  MEDIUM = 100,
  SMALL = 50,
}

@Component({
  selector: 'indefinite-loader',
  standalone: true,
  template: `<t-progress
    class="progress"
    [radius]="size"
    [progress]="progress"
    [color]="this.color"
  ></t-progress>`,
  styles: [
    `
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .progress {
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.5s ease-in-out;
      }
    `,
  ],
  imports: [TProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndefiniteLoaderComponent implements OnInit, OnDestroy {
  @Input() size: LoaderSize = LoaderSize.MEDIUM;
  color: string = 'var(--accent-color)';

  progress = 0;
  increment = 1;
  intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      requestAnimationFrame(() => {
        if (this.progress === 100) {
          this.increment = -1;
        } else if (this.progress === 0) {
          this.increment = 1;
        }
        this.progress = this.progress + this.increment;
        this.ref.markForCheck();
      });
    }, 1000 / 120);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
