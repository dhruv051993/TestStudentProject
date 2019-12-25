import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private http: HttpClient) {}

  getProductsFromData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<{}> {
    return this.http.delete<Product>(`${this.productsUrl}/${productId}`);
  }
}
