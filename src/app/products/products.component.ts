import { Component, OnInit } from '@angular/core';

import { Product, ProductsService } from '../../services/products.service';

import { TGridComponent } from '../../components/table/grid/t-grid.component';
import { TColumnComponent } from '../../components/table/grid/t-column.component';
import { CommonModule } from '@angular/common';

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

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }
}
