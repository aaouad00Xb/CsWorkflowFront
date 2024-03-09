import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-evo-chart',
  templateUrl: './evo-chart.component.html',
  styleUrls: ['./evo-chart.component.scss']
})
export class EvoChartComponent {

  
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
  dates: any[] = [];

  constructor() {
    
   }

  
 
   ngOnChanges(changes: SimpleChanges): void {
    // Check if data1, data2, data3, or labels have changed
    
    
      this.onInputChange(); // Call your function when inputs change
  
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
    this.onInputChange()
  }


  onInputChange(){
   
    const entrepriises = this.data1.map(m=>m.name)

    this.data1.forEach(f=>{
      f.endLabel= {
        show: true,
        formatter: (params)=>{
          return params.seriesName+ ': ' + params.value +'h';
        }
      }
      f.labelLayout= {
        moveOverlap: 'shiftY'
      }
      f. emphasis= {
        focus: 'series'
      }
      

      return f;
    })
    

    this.option = {
      animationDuration: 10000,
     
      title: {
        text: 'Retard par division'
      },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: entrepriises
      // },
      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      //   containLabel: true
      // },
      grid: {
        right: 140
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.dates
      },
      yAxis: {
        type: 'value'
      },
      series: this.data1
    };
    
    

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
  onChange: function () {
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
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },    
  ]
};


 
}
}
