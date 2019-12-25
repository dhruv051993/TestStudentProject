import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { clone } from 'lodash';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    products: Product[] = [];
    productForm: Boolean = false;
    editProductForm: Boolean = false;
    isNewForm: boolean;
    newProduct: any = {};
    editedProduct: any = {};
    form: FormGroup;

    constructor(
        private productService: ProductService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createForm();
        this.getProducts();
    }

    createForm(): void {
        this.form = this.fb.group({
            fName: ['', Validators.required],
            lName: ['', Validators.required],
            email: ['', Validators.required],
            phoneNo: ['', Validators.required],
            status: [false, Validators.required],
        });
    }

    getProducts() {
        this.productService.getProductsFromData().subscribe((products) => {
            this.products = products;
        });
    }

    showEditProductForm(product: Product) {
        if (!product) {
            this.productForm = false;
            return;
        }
        this.editProductForm = true;
        this.editedProduct = clone(product);
    }

    showAddProductForm() {
        // resets form if edited product
        if (this.products.length) {
            this.newProduct = {};
        }
        this.productForm = true;
        this.isNewForm = true;
    }

    saveProduct(product: Product) {
        if (this.isNewForm) {
            // add new product
            this.productService.addProduct(product).subscribe((data: any) => {
                this.productService.getProductsFromData().subscribe((products) => {
                    this.products = products;
                });
            } );
        }
        this.productForm = false;
    }

    updateProduct() {
        this.productService.updateProduct(this.editedProduct).subscribe((data: any) => {
            this.productService.getProductsFromData().subscribe((products) => {
                this.products = products;
            });
        });

        this.editProductForm = false;
        this.editedProduct = {};
    }

    removeProduct(product: Product) {
        this.productService.deleteProduct(product.id).subscribe(() => {
            this.productService.getProductsFromData().subscribe((products) => {
                this.products = products;
            });
        });
    }

    cancelNewProduct() {
        this.newProduct = {};
        this.productForm = false;
    }

    cancelEdits() {
        this.editedProduct = {};
        this.editProductForm = false;
    }


}
