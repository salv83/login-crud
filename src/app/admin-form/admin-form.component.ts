import { User } from './../module/user';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() selectedUser: User;
  @Input() user: User;
  @Output() adminformEvent = new EventEmitter<object>();

  constructor(private adminservice: AdminService) { }

  save(form: NgForm) {
    if (this.selectedUser === undefined || this.selectedUser === null) {
      this.add(form.value);
    } else {
      this.edit(form.value);
    }
    form.reset();
  }

  add(user: User) {
    this.adminservice.postUser(user)
      .subscribe(data => {
        this.users = data;
        this.adminformEvent.emit({ 'action': 'add' });
      });
  }

  edit(user: User) {
    if (this.selectedUser.id === undefined || this.selectedUser.id === null) {
      this.add(user);
    } else {
      const newUser = Object.assign(
        {},
        this.selectedUser,
        user
      );
      this.adminservice.putUser(newUser)
        .subscribe(data => {
          const id = this.users.findIndex(user => user.id === newUser.id);
          this.users[id] = newUser;
          this.adminformEvent.emit({ 'action': 'update' });
        }
        );
    }
  }

  delete(user: User) {
    this.adminservice.deleteUser(user)
      .subscribe(
        () => {
          const id = this.users.indexOf(user);
          this.users.splice(id, 1);
        }
      );
  }


  reset() {
    this.selectedUser = new User();
  }

  ngOnInit() {
  }

}
