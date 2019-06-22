import { User } from './../module/user';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  users: User[];
  selectedUser: User;
  permissions: boolean = false;
  constructor(private adminservice: AdminService) { }

  getAllUsers() {
    this.adminservice.getAll()
      .subscribe(data => this.users = data);

  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  goAdminForm(obj: Object) {
    if ((obj['action'] === 'add') || (obj['action'] === 'update')) {
      this.getAllUsers();
    }
  }

  ngOnInit() {
    this.getAllUsers();
    if((localStorage.getItem('role'))=='administrator'){
      this.permissions = true;
    }
  }

}
