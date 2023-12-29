import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ProductsComponent } from './products/products.component';
import { ProgressDemoComponent } from './progress-demo/progress-demo.component';
import { ThemeProviderComponent } from '../components/theme-provider/theme-provider.component';
import { SectionComponent } from '../components/section/section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    ProductsComponent,
    ProgressDemoComponent,
    ThemeProviderComponent,
    SectionComponent,
  ],
  templateUrl: './app.component.html',
  styles: [
    `
      .main {
        padding: 1rem;
      }

      .title {
        text-align: center;
        font-size: 3rem;
        margin: 1rem 0 3rem;
        color: var(--accent-color);

        transition-property: color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);
      }

      .sections {
        display: flex;
        flex-direction: column;
        gap: 5rem;
      }
    `,
  ],
})
export class AppComponent {}
