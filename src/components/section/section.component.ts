import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  template: `<section>
    <h2 class="section-heading">{{ sectionName }}</h2>
    <div class="section-content"><ng-content /></div>
  </section>`,
  styles: [
    `
      .section-content {
        /* margin: 0 1rem; */
      }

      .section-heading {
        color: var(--text-color);
        margin: 0 0 1rem;

        transition-property: color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);
      }
    `,
  ],
})
export class SectionComponent {
  @Input({ required: true }) sectionName!: string;
}
