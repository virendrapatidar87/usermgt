import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor() {
    this.setIsLogin();
   }
  private looggedIn=new BehaviorSubject<boolean>(false);
get isLoggedIn (){
  return this.looggedIn.asObservable();


}
setIsLogin()
{
  if(localStorage.getItem('currentUser')== null)
  {

  this.looggedIn.next(false);
  }
  else{
   this.looggedIn.next(true);
  }

}
}
