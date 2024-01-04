import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnChanges{


  
  myChart: any;
  option: any;
  labelOption:any

  @Input()
  data1: any[] = [];
  @Input()
  data2: any[] = [];
  @Input()
  data3: any[] = [];
  @Input()
  color: any= 'red';

  @Input()
  label: any;


  @Input()
  labels: any[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    // Check if data1, data2, data3, or labels have changed
    
    
      this.onInputChange(); // Call your function when inputs change
  
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
    this.onInputChange()
  }


  onInputChange(){
    console.log("hello")

    if(this.option){
      if(this.option){
        this.option = {
          title: {
            text: this.label,
            subtext: 'Données à jour',
            left: 'left'
          },
          
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: 'Pressure',
              type: 'gauge',
              detail: {
                formatter: '{value}'
              },
              data: [
                {
                  value: this.data1,
                  name: 'Jours'
                }
              ],
              itemStyle: {
                color: this.color // Change the color here
              }
            }
          ]
        };
        
  
        this.myChart ? this.myChart.setOption(this.option):'';
    }
   
    }
    

  }
  

  constructor() {
    
   }

  
 

   
  
 



  ngOnInit(): void {
    var app:any = {};



const posList = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight'
];
app.configParameters = {
  rotate: {
    min: -90,
    max: 90
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  position: {
    options: posList.reduce( (map:any, pos:any)=> {
      map[pos] = pos;
      return map;
    }, {})
  },
  distance: {
    min: 0,
    max: 100
  }
};
app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  onChange:  () =>{
    const labelOption = {
      rotate: app.config.rotate,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      position: app.config.position,
      distance: app.config.distance
    };
    this.myChart.setOption({
      series: [
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        }
      ]
    });
  }
};
this.labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 12,
  rich: {
    name: {}
  }
};




this.option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      detail: {
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
      ],
      itemStyle: {
        color: 'red' // Change the color here
      }
    }
  ]
};


 
}
}
