import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
//import { LoginService } from 'login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registrationForm;
  constructor(private newService: LoginService,private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
this.registrationForm = new FormGroup({
      'username': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]),
      'password': new FormControl('',
        [
          Validators.required,
          //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
          Validators.minLength(8),
          Validators.maxLength(30)
        ]),
      'repeatpassword': new FormControl('',
        [
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
    })
  }
  onRegister = function (user) {
    console.log("=======================================User Register====================================="+user);
    //user.mode = this.valbutton;
    var result;
    this.newService.register(user).subscribe(data => { result = data; localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
   }
      , error => this.errorMessage = error);
    // console.log('result '+ result);

  }
}
