import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(private authSvc :AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  onLogOut() : void {
    localStorage.removeItem('currentUser'); 
    this.authSvc.setIsLogin(); 
    console.log(' ***********Log Out**********************'); 
    this.router.navigate(['/login']);
  }
}
