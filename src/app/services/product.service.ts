import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:8080/products';
  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(this.url);
  }

  getProductById(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  addOrUpdateProduct(product: Product) {
    return this.httpClient.post(this.url, product);
  }

  deleteProduct(id: number) {
    var response = this.httpClient.delete(this.url + '/' + id, {responseType: 'text'});
    console.log(`Data: ${JSON.stringify(response)}`);
    return response;
  }
}
