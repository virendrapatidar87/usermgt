import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  user;
  constructor(private authSvc :AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   this.user = JSON.parse(localStorage.getItem("loggedInUser")); 
  }
  onLogOut() : void {
    localStorage.removeItem('currentUser'); 
     localStorage.removeItem('loggedInUser'); 
    this.authSvc.setIsLogin(); 
    console.log(' ***********Log Out**********************'); 
    this.router.navigate(['/login']);
  }
}
