import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class UsersvcService {
   readonly path='http://localhost:8080/api/usermgt/';
  constructor(private http: HttpClient ) {
    
  }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  saveData(dataobject) : Observable<any> {
    console.log("save data");
   // const formdata: FormData = new FormData();
   // formdata.append('body',dataobject);
    //formdata.append('file', file);

    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    console.log("save data"+this.getToken());
    return this.http.post(this.path, dataobject ,{ headers : headers});
  } 

  updateData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.put(this.path , dataobject ,{ headers : headers});
  }
  GetList() : Observable<any> {
   console.log("call list");
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.get(this.path ,{headers: headers});
  }
 
  deleteData(id) : Observable<any>  {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.delete(this.path+ id,{headers : headers});
  }
  getDataById(id) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
       return this.http.get(this.path+id,{headers : header})
  }
  getImgById(id) : Observable<any>  {
	    console.log("get img data " + this.path);
    let header = new HttpHeaders({'x-access-token':this.getToken()});
   return    this.http.get(this.path+'avatar/' +id,{headers : header});/* .subscribe(data => {
     console.log(data);
     return  data;
    }, error => {
      return error;
    });
	return null; */

 }
}
