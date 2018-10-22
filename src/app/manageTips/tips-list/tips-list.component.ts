import { Component, OnInit } from '@angular/core';
import { TipsService } from '../tips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tips-list',
  templateUrl: './tips-list.component.html',
  styleUrls: ['./tips-list.component.css']
})
export class TipsListComponent implements OnInit {
lstTips$;
  constructor(private tipsvc:TipsService,private router: Router) { }

  ngOnInit() {
     this.lstTips$ =  this.tipsvc.GetList();
  }

  delete(id){
    console.log("delete tip "+ id);
    
    this.tipsvc.deleteData(id)
    .subscribe(data => {
      this.lstTips$ =  this.tipsvc.GetList();
    },
    error =>  error
  )
  }
  edit(id){
    this.router.navigate(['/addtip', id]);
    /* this.id = id;
    this.openDialog(); */
  }

}
