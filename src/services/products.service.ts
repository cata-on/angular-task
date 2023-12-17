import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Product = {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    const url = new URL('https://dummyjson.com/products?limit=0');
    return this.http.get<{ products: Product[] }>(url.href);
  }
}
