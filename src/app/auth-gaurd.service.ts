import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import {take} from  'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { }

  canActivate(next:ActivatedRouteSnapshot,
  state:RouterStateSnapshot):Observable<boolean>
  {

    return this.auth.isLoggedIn.pipe(
      take(1),
map((isLoggedIn:boolean)=>{
  if(!isLoggedIn)
  {
    this.router.navigate(['/login']);
    return false;
  }
return true;
}));
  }
}
