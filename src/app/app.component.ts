import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,private authsvc:AuthService){}
  
  //constructor(private router: Router,private matIconRegistry: MatIconRegistry,
  //  private domSanitizer: DomSanitizer) {
  //  this.matIconRegistry.addSvgIcon(
  //    "user",
  //    this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/user.svg")
  //  );
 // }
  
isLoggedIn$:Observable<boolean>;
  

  ngOnInit() {
        this.isLoggedIn$=this.authsvc.isLoggedIn;
    //  if(localStorage.getItem('currentUser')== null){
      
    //  this.router.navigate(['/login']);
    //  }
  

  }
  
} 