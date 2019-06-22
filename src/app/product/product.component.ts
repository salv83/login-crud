import { ProductService } from './../service/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../module/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  active: Product;
  searchvalue: String;

  constructor(private productservice: ProductService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productservice.getAll()
      .subscribe(data => this.products = data);

  }

  setActive(product: Product) {
    this.active = product;
  }

  goForm(obj: Object) {
    if ((obj['action']==='add')||(obj['action']==='update')) {
        this.getAllProduct();
    }
  }

  orderByTitle(){
    let newProduct = this.products;
    newProduct.sort((a, b) => (a.title > b.title) ? 1 : -1)
    this.products = newProduct;
  }

  orderByPrice(){
    let newProduct = this.products;
    newProduct.sort((a, b) => (a.price > b.price) ? 1 : -1)
    this.products = newProduct;
  }

  orderByDataCreated(){
    let newProduct = this.products;
    newProduct.sort((a, b) => (a.date_created > b.date_created) ? 1 : -1)
    this.products = newProduct;
  }

  onChange(newValue) {
    switch (newValue) {
      case 'title':
        this.orderByTitle();
        break;
      case 'price': 
        this.orderByPrice();
        break;
      case 'data_created': 
        this.orderByDataCreated();
        break;
    }
}

search(form: NgForm){
  let newProduct = this.products;
  let word = form.value.searchvalue;
  for(let i=0; i<newProduct.length; i++){
    if((newProduct[i].title.toLowerCase().indexOf(word.toLowerCase()) !== -1)||(newProduct[i].description.toLowerCase().indexOf(word.toLowerCase()) !== -1)){
      /* fine the word is inside */
    }else{
      newProduct.splice(i, 1)
    }
  }
  this.products = newProduct;
}

}