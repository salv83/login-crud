import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  

  constructor(private authservice: RegistrationService, private router: Router, private route: ActivatedRoute) {}

  sendData(form: NgForm){ 
    this.authservice.register(form)
    .subscribe(data => {
      alert(data['msg']);
      this.router.navigate(['login']);
    }
    );
    form.reset();
  }
  
  ngOnInit() {
  }

}
