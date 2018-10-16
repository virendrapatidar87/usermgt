import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class UsersvcService {
  private readonly path='http://localhost:8080/api/usermgt/';
  constructor(private http: HttpClient ) {
    
  }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  saveData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.post(this.path +'addUser', dataobject ,{ headers : headers});
  } 

  updateData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.put(this.path +'edit', dataobject ,{ headers : headers});
  }
  GetList() : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.get(this.path +'listUser',{headers: headers});
  }
  // GetSelectList() : Observable<any> {
  //   let headers = new HttpHeaders({'x-access-token':this.getToken()});
  //   return this.http.get('http://localhost:8080/api/project/select',{headers: headers});
  // }
  // deleteData(id) : Observable<any>  {
  //   let headers = new HttpHeaders({'x-access-token':this.getToken()});
  //   return this.http.delete('http://localhost:8080/api/project/'+ id,{headers : headers});
  // }

  getDataById(id) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
       return this.http.get(this.path+id,{headers : header})
  }
}
