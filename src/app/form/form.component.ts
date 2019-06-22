import { Product } from './../module/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  /* To link the product component with the form component we used <app-form [product]="product"></app-form>
  and here we import product using the Input decorator */
  @Input() products: Product[] = [];
  @Input() active: Product;
  @Input() product: Product;
  @Output() formEvent = new EventEmitter<object>();

  private imageSrc: any;
  private newProductWithImage = new Product();
  constructor(private productservice: ProductService) { }

  ngOnInit() {
    
  }

  save(form: NgForm) {
    if (this.active === undefined || this.active === null) {
      this.add(form.value);
    } else {
      this.edit(form.value);
    }
    form.reset();
  }

  add(product: Product) {
    this.newProductWithImage.title = product.title;
    this.newProductWithImage.description = product.description;
    this.newProductWithImage.price = product.price;
    this.newProductWithImage.date_created = product.date_created;
    this.newProductWithImage.image = this.imageSrc;
    this.productservice.postProduct(this.newProductWithImage)
      .subscribe(data => {
        this.products = data;
        this.formEvent.emit({ 'action': 'add' });
      });

  }

  edit(product: Product) {
    if (this.active.id === undefined || this.active.id === null) {
      this.add(product);
    } else {
      const newProduct = Object.assign(
        {},
        this.active,
        product
      );
      this.productservice.putProduct(newProduct)
        .subscribe(data => {
          const id = this.products.findIndex(product => product.id === newProduct.id);
          this.products[id] = newProduct;
          this.formEvent.emit({ 'action': 'update' });
        }
        );
    }
  }


  delete(product: Product) {
    this.productservice.deleteProduct(product)
      .subscribe(
        () => {
          const id = this.products.indexOf(product);
          this.products.splice(id, 1);
        }
      );
  }

  readUrl(event: any, form: NgForm) {
    if (this.active === undefined || this.active === null) {
      this.active = new Product();
      this.active.title = form.value.title;
      this.active.description = form.value.description;
      this.active.price = form.value.price;
      this.active.date_created = form.value.date_created;
      var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    } else {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.active.image = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.active.image = this.imageSrc;
  }

  reset() {
    this.active = new Product();
  }

}