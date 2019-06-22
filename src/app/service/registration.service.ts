import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
const url = 'http://crud-login.loc/server/register.php';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private option: HttpHeaders = new HttpHeaders().set('Content-type', 'x-www-form-urlencoded');

  constructor(private http: HttpClient) { }
  
  register(form: NgForm) {
    let param = new HttpParams()
    .set('username', form.value.username)
    .set('password', form.value.password);
    return this.http.post(url, param, {headers: this.option })
  }

}
