import { Component, OnInit } from '@angular/core';

import { TProgressComponent } from '../../components/progress/t-progress.component';

@Component({
  selector: 'progress-demo',
  standalone: true,
  templateUrl: './progress-demo.component.html',
  styleUrl: './progress-demo.component.css',
  imports: [TProgressComponent],
})
export class ProgressDemoComponent implements OnInit {
  incrementedPercentage: number = 0;

  sliderProgress: number = 75;
  sliderRadius: number = 75;
  sliderColor: string = '#008170';

  changeProgress(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.sliderProgress = Number(event.target.value);
  }
  changeRadius(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.sliderRadius = Number(event.target.value);
  }
  changeColor(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.sliderColor = event.target.value;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.incrementedPercentage += 5;
      if (this.incrementedPercentage > 100) this.incrementedPercentage = 0;
    }, 100);
  }
}
