import { User } from './../module/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://crud-login.loc/server/userdata.php';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private option: HttpHeaders = new HttpHeaders().set('Content-type','application/json');
  
  constructor(private http: HttpClient) { }

  getUserData(username: string, password: string):Observable <User[]>{ 

    let endpoint = url + "?username=" + username + "&password=" + password;
    return this.http.get<User[]>(endpoint);
    
  }


}
