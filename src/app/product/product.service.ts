import { Injectable } from '@angular/core';
import { Product } from './product';
// import { PRODUCT_ITEMS } from './product-data';
import { findIndex } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // private pItems = [PRODUCT_ITEMS];
    private pItems = [];
    private productsUrl = 'api/products';

    constructor(private http: HttpClient) { }

    getProductsFromData(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl);
    }

    // getProductsFromData(): Product[] {
    //     console.log(this.pItems);
    //     return this.pItems;
    // }

    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.productsUrl, product)
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        );
    }

    updateProduct(product: Product): Observable<Product> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<Product>(url, product)
            .pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
                // Return the product on an update
                map(() => product)
            );
    }

    deleteProduct(productId: number): Observable<{}> {
        const url = `${this.productsUrl}/${productId}`;

        return this.http.delete<Product>(url)
            .pipe(
                tap(data => console.log('deleteProduct: ' + productId))
            );
    }
}
