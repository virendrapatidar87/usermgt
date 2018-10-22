import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  
  loginForm;
  constructor(private newService: LoginService,private authSvc:AuthService,private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {

    if(localStorage.getItem('currentUser')){
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = new FormGroup({
      
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
      })
  }

  onLogin(user) : void {
    this.newService.login(user).subscribe(data => { console.log(data); localStorage.setItem('currentUser', data.token);  localStorage.setItem('loggedInUser', JSON.stringify(data.user)); this.authSvc.setIsLogin(); console.log('Looged in user '+localStorage.getItem('loggedInUser')); this.router.navigate(['/dashboard']);}
      , error => error);
    
  }
  

    
  
  
}
