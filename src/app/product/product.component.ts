import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  operation: string = 'show';
  products: Product[];
  id: number = null;
  name: string = null;
  brand: string = null;

  constructor(private productService: ProductService) { }

  addProduct() {
    const product = {
      pId: this.id,
      pName: this.name,
      pBrand: this.brand
    }
    console.log(product);
    this.productService.addOrUpdateProduct(product).subscribe(() => {
      if(!this.id)
        alert("Product Added");
      else
        alert("Product Updated");  
      this.operation = 'show';
      this.name = '';
      this.brand = '';
      this.ngOnInit();
    }, (error) => {
      alert("Hubo un error");
      console.log(error);
    })
  }

  editProduct(paId: number, paName: string, paBrand: string) {
    this.operation = 'add';
    this.id = paId;
    this.name = paName;
    this.brand = paBrand;
  }

  deleteProduct(paId: number) { 
    this.productService.deleteProduct(paId).subscribe(() => {
      alert("Product deleted");
      this.ngOnInit();

    }, (error) => {
      console.log(error);
    })
  }


  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    }, (error) => {
      console.log(error);
    })
  }

}
