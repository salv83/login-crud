import { AuthenticationService } from './../service/authentication.service';
import { Navigation } from './../module/navigation';
import { Component, OnInit } from '@angular/core';

Navigation
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth: AuthenticationService) { 
    this.menu = [
      {label: 'public area', url: 'public'},
      {label: 'private area', url: 'private'},
      {label: 'register', url: 'register'},
      {label: 'admin', url: 'admin'}
    ];
  }
 
  menu: Navigation[];

  ngOnInit() {
  }

}
