import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersvcService } from '../usersvc.service';
import { Router } from '@angular/router';
import{take} from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  isList=true;
  lstUser$;
  errorMessage;
  target;
  uView;
  url ;

  @ViewChild("baseChart") chart: BaseChartDirective;
  constructor(private usvc:UsersvcService,private router: Router) {
   this.url = usvc.path;
    
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
  chartData = [{
    label: 'AchiveTarget',
    data: [325,0] 
  },{
    label: 'Target',
    data: [985] 
  }];

  view(u)
  {
    this.uView=u;
    const pr = this.usvc.getUserTargetData(u._id).pipe(take(1));
    pr.subscribe(x=>this.setchartData(x)
      
    );


    

    this.isList=false;
  }
  gotoList()
  {
    this.uView={};
    this.isList=true;

  }
/* Chart Implementation*/

 // ADD CHART OPTIONS. 
 chartOptions = {
  responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
}

labels =  ['Target'];

// STATIC DATA FOR THE CHART IN JSON FORMAT.
setchartData(trgt)
{

  this.reloadChart(trgt);
}

// CHART COLOR.
colors = [
  
  { // 2nd Year.
    backgroundColor: 'rgba(30, 169, 224, 0.8)'
  },{ // 1st Year.
    backgroundColor: 'rgba(77,83,96,0.2)'
  }
]

// CHART CLICK EVENT.
onChartClick(event) {
  console.log(event);
}

reloadChart(trgt) {
  if (this.chart !== undefined) {
     //this.chart.chart.destroy();
    // this.chart.chart = 0;


    
     this.chart.datasets = [{
      label: 'AchiveTarget',
      data: [trgt[0].achiveTarget,0] 
    },{
      label: 'Target',
      data: [trgt[0].target] 
    }];
     this.chart.labels = this.labels;
     this.chart.ngOnInit();
  }
}


  async getImg(id){
   console.log("------------------------------------------------------"+id);
   return 'data:image/jpg;base64,'+this.usvc.getImgById(id);
      }
}
