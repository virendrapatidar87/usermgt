import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  title = 'Bar Chart Example in Angular 4';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  ['Target'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
   
    {
      label: 'AchiveTarget',
      data: [350,0] 
    },
    {
      label: 'Target',
      data: [750] 
    },
  ];

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
}
