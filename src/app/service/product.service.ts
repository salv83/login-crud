import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../module/product';
import { Observable } from 'rxjs';

const url = "http://crud-login.loc/server/index.php";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  products: Product [];

  private option: HttpHeaders = new HttpHeaders().set('Content-type','application/json');

  constructor(private http: HttpClient) { }

  getAll():Observable <Product []>{ 
    return this.http.get<Product []>(url);
  }

  postProduct(product: Product): Observable<any> {
    let test = JSON.stringify(product);
    return this.http.post(url, test, {headers: this.option });
  }

  putProduct(product: Product): Observable<any> {
    return this.http.put(url + '?id=' + product.id, product, {headers: this.option });
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete(url + '?id=' + product.id);
  }

}
