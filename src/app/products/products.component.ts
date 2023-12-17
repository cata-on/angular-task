import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Product, ProductsService } from '../../services/products.service';
import {
  TGridComponent,
  TGridPaginationChangeEvent,
  TGridSortChangeEvent,
} from '../../components/table/grid/t-grid.component';
import { TColumnComponent } from '../../components/table/column/t-column.component';

@Component({
  standalone: true,
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService],
  imports: [CommonModule, TGridComponent, TColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products: Product[] | Observable<Product[]> | null = null;

  pageSize = 5;

  constructor(
    private productsService: ProductsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Mode 1: Non-Observable
    // this.productsService.getProducts().subscribe((data) => {
    //   this.products = data;
    //   this.ref.markForCheck();
    // });

    // Mode 2: Observable
    this.products = this.productsService.getProducts();
  }

  performFetch(event: TGridPaginationChangeEvent) {
    // React to pagination changes if needed
    event;
  }

  handleSortChange(event: TGridSortChangeEvent<Product>) {
    // React to sort changes if needed
    event;
  }
}
