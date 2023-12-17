import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product, ProductsService } from '../../services/products.service';
import {
  TGridComponent,
  TGridPaginationChangeEvent,
} from '../../components/table/grid/t-grid.component';
import { TColumnComponent } from '../../components/table/column/t-column.component';

@Component({
  standalone: true,
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService],
  imports: [CommonModule, TGridComponent, TColumnComponent],
})
export class ProductsComponent implements OnInit {
  products: Product[] | null = null;

  pageSize = 15;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }

  performFetch(event: TGridPaginationChangeEvent) {
    // React to pagination changes if needed
    event;
  }
}
