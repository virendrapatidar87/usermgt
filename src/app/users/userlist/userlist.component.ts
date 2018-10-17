import { Component, OnInit } from '@angular/core';
import { UsersvcService } from '../usersvc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  lstUser$;
  errorMessage;
  constructor(private usvc:UsersvcService,private router: Router) {
   
    
   }

  ngOnInit() {
    this.lstUser$ =  this.usvc.GetList();//.subscribe(data => { this.lstUser = data; 
   // },error => 'error');
  }

  delete(id){
    console.log("delete user "+ id);
    
    this.usvc.deleteData(id)
    .subscribe(data => {
      this.lstUser$ =  this.usvc.GetList();
    },
    error => this.errorMessage = error
  )
  }
  edit(id){
    this.router.navigate(['/adduser', id]);
    /* this.id = id;
    this.openDialog(); */
  }
  
}
