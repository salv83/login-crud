import { AuthenticationService } from './../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  page: string;

  constructor(private authservice: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
 

  sendLogin(form: NgForm){ 
    this.authservice.login(form)
    .subscribe(data => {
      this.router.navigate([this.page]);
    }
    );
  }

  ngOnInit() {
    this.authservice.logout();
    this.page = this.route.snapshot.queryParams['page']||'';
  }

}
