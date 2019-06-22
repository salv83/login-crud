import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../module/product';
import { MatPaginator, PageEvent } from '@angular/material';
import { ProductService } from '../service/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-public-area',
  templateUrl: './public-area.component.html',
  styleUrls: ['./public-area.component.css']
})
export class PublicAreaComponent implements OnInit {


  products: Product[];
  active: Product;
  pagedList: Product[] = [];
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private productservice: ProductService) { }

  ngOnInit() {
    this.productservice.getAll()
      .subscribe(
        data => {
        this.products = data;
        this.pagedList = this.products.slice(0, 15);
        this.length = this.products.length;
      });
    }


  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedList = this.products.slice(startIndex, endIndex);
  }

  getAllProduct() {
    this.productservice.getAll()
      .subscribe(data => this.products = data);

  }

  goForm(obj: Object) {
    if ((obj['action'] === 'add') || (obj['action'] === 'update')) {
      this.getAllProduct();
    }
  }

  orderByTitle(){
    let newProduct = this.pagedList;
    newProduct.sort((a, b) => (a.title > b.title) ? 1 : -1)
    this.products = newProduct;
  }

  orderByPrice(){
    let newProduct = this.pagedList;
    newProduct.sort((a, b) => (a.price > b.price) ? 1 : -1)
    this.products = newProduct;
  }

  orderByDataCreated(){
    let newProduct = this.pagedList;
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
  this.pagedList = newProduct;
}

}
