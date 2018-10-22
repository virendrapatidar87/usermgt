import { Component, OnInit } from '@angular/core';
import { TipModel } from '../tipModel';
import { TipsService } from '../tips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NouiFormatter } from "ng2-nouislider/src/nouislider";  
@Component({
  selector: 'app-manage-tips',
  templateUrl: './manage-tips.component.html',
  styleUrls: ['./manage-tips.component.css']
})
export class ManageTipsComponent implements OnInit {
  tipId;
  objPage:TipModel=new TipModel();
  selectedRange=[1,1000];
  constructor(private route: ActivatedRoute, private router: Router, private tipsvc:TipsService) { }

  ngOnInit() {
     this.route.params.subscribe(params => { this.tipId = params['id']});
    console.log(this.tipId + "   hjkasdhjkgjhsa");
     
    if(this.tipId){
      this.tipsvc.getDataById(this.tipId).subscribe(data=>
        {
          console.log(JSON.stringify(data));
      this.objPage =  data;
      console.log(JSON.stringify(this.objPage));
      this.selectedRange=[];
      this.selectedRange.push(this.objPage.minRange);
      this.selectedRange.push(this.objPage.maxRange);
    },error => console.log( error));
        //returndata =>this.assignValues(returndata));
     }
  }
    assignValues(data)
    {
 console.log(JSON.stringify(data));
      this.objPage={
      'minRange' : data.minRange,
      'maxRange': data.maxRange,
      'tipHeading': data.tipHeading,
      'tipText': data.tipText,
      'creditscoreRange': data.creditscoreRange,
      'userId':data.userId,
      'createdDate':data.createdDate,
      'status': data.status,
      'updatedDate':data.updatedDate,
      '_id':data._id
    }      
       
 this.selectedRange=[];
 this.selectedRange.push(this.objPage.minRange);
      this.selectedRange.push(this.objPage.maxRange);

    }
save()
 {
 
this.objPage.minRange=this.selectedRange[0];
this.objPage.maxRange=this.selectedRange[1];
if(this.tipId)
{
this.tipsvc.updateData(this.objPage).subscribe(data => {  data;
  // localStorage.removeItem('currentUser');
 this.router.navigate(['/manageTips']);
}, error =>  error);
//this.router.navigate(['/dashboard']);
}
else
{

console.log(JSON.stringify(this.objPage));
  this.tipsvc.saveData(this.objPage).subscribe(data => {  data;
  // localStorage.removeItem('currentUser');
 this.router.navigate(['/manageTips']);
}, error =>  error);
}
 }
 
 
 cancel()
 {
  this.objPage=null;
  this.router.navigate(['/manageTips']);
 }
  }


