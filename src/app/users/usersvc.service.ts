import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class UsersvcService {
  private readonly path='http://localhost:8080/api/user/';
  constructor(private http: Http) {}

  register(user: User) : Observable<any> {
    return this.http.post(this.path+'register/', user)
      
  }
  update(user: User)
  {return this.http.put(this.path,user).map(res => res.json());

  }
  getAll() {
    return this.http.get(this.path)
    .map(res => res.json());
  }
  
  get(userId) { 
    return this.http.get(this.path + '/' + userId)
    .map(res => res.json());
  }

  

  ActivateDeactivateuser(user: User) { 
    return this.http.put(this.path+'setsatus/',user).map(res => res.json());
  }
}
