import { User } from './../module/user';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'http://crud-login.loc/server/user.php';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private option: HttpHeaders = new HttpHeaders().set('Content-type','application/json');

  constructor(private http: HttpClient) { }
  
  getAll():Observable <User []>{ 
    return this.http.get<User []>(url);
  }

  putUser(user: User): Observable<any> {
    return this.http.put(url + '?id=' + user.id, user, {headers: this.option });
  }

  postUser(user: User): Observable<any> {
    let test = JSON.stringify(user);
    return this.http.post(url, test, {headers: this.option });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(url + '?id=' + user.id);
  }

}
