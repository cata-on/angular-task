import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'products',
  templateUrl: './products.component.html',
  providers: [ProductsService],
  imports: [CommonModule],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }
}
