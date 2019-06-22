import { User } from './../module/user';
import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../service/userdata.service';
import { NgForm } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  users: User[];
  selected: User;

  constructor(private usedataservice: UserdataService, private adminservice: AdminService) { }

  getUserdata(username: string, password: string){
    this.usedataservice.getUserData(username, password)
    .subscribe(data => this.users = data);

   }


  save(form: NgForm) { 
    const newUser = Object.assign(
      {},
      this.selected,
      form.value
    );
    this.adminservice.putUser(newUser)
      .subscribe(data => {
        const id = this.users.findIndex(user => user.id === newUser.id);
        this.users[id] = newUser;
      }
      );
  }

  reset() { 
    this.selected = new User();
  }

  ngOnInit() {
    let username = localStorage["username"];
    let password = localStorage["password"];
    this.getUserdata(username, password);

  }

  setActive(user: User) {
    this.selected = user;
  }

}
