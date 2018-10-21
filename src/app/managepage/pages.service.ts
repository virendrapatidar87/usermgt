import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private readonly path='http://localhost:8080/api/pagemgt/';
  constructor(private http: HttpClient) { }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  updateData(dataobject) : Observable<any> {
    console.log(" update "+ JSON.stringify(dataobject));
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.put(this.path , dataobject ,{ headers : headers});
  }
  getDataByName(name) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
       return this.http.get(this.path+name,{headers : header});
  }
}






