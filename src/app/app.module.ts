import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product/product.service';
import { ProductData } from './product/product-data';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, InMemoryWebApiModule.forRoot(ProductData, { dataEncapsulation: false }), HttpClientModule],
  declarations: [AppComponent, ProductComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
