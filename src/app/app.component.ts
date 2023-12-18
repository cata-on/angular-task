import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { ProgressDemoComponent } from './progress-demo/progress-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, ProductsComponent, ProgressDemoComponent],
  templateUrl: './app.component.html',
  styles: [
    `
      .main {
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent {}
