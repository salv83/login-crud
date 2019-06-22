    
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

const url = 'http://crud-login.loc/server/auth.php';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private option: HttpHeaders = new HttpHeaders().set('Content-type', 'x-www-form-urlencoded');
  constructor(private http: HttpClient) { }

  login(formData){ 
    const body = this.body(formData);
    return this.http.post(url, body, {headers: this.option })
    .pipe(
      map(login => {
        if (login['msg']=="success") {
          this.setSession(login['msg']);
          localStorage.setItem('username', formData.value.username);
          localStorage.setItem('password', formData.value.password);
          localStorage.setItem('role', 'normal user');
        }
        if (login['msg']=="success - administrator") {
          this.setSession(login['msg']);
          localStorage.setItem('username', formData.value.username);
          localStorage.setItem('password', formData.value.password);
          localStorage.setItem('role', 'administrator');
        }
        return login['msg'];
      }),
    );
  }

  logout(){ 
    localStorage.removeItem('expire');
  }

  private setSession(result: string){ 
    let expire: number = new Date().getTime() + 3600000; /* Session Duration: 1h */
    localStorage.setItem('expire', expire.toString());
  }

  notExpired(): boolean {
     if (localStorage.getItem('expire')) {
       let expire: number = parseInt(localStorage.getItem('expire'));
       return new Date().getTime() < expire;
     }
     return false;
   }

  private body(df: NgForm) {
    let param = new HttpParams()
     .set('username', df.value.username)
     .set('password', df.value.password);
     return param;
   }

}
