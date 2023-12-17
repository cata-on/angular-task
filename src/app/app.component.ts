import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, ProductsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
