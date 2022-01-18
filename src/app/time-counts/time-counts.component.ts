import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataLoaderService} from '../services/data-loader.service';
import {DataService} from '../services/data.service';

declare var require: any;
const HIGHCHARTS_MORE: any = require('highcharts/highcharts-more');
HIGHCHARTS_MORE(Highcharts);

@Component({
  selector: 'app-time-counts',
  templateUrl: './time-counts.component.html',
  styleUrls: ['./time-counts.component.css']
})

export class TimeCountsComponent implements OnInit, OnDestroy {
  @ViewChild('timeCountChartTarget', {static: true}) chartTarget!: ElementRef;
  chart!: any;
  series: number[] = [];
  years: number[] = [];

  constructor(private  dataLoaderService: DataLoaderService,
              private  dataService: DataService) {
  }

  ngOnInit() {
    this.dataLoaderService.data$.subscribe(res => {
      [...res.values()].forEach(drugs => {
        let sum = 0;
        drugs.map((drug: { developmentTime: number; }) => sum = sum + drug.developmentTime);
        this.series.push(Number((sum / drugs.length).toFixed(2)));
      });
      this.makeChart();
      this.highlightBar();
    });


   /* this.dataLoaderService.data$.subscribe(res => {
      res.forEach(drugs => {
        let sum = 0;
        let r = drugs.map(drug => drug.developmentTime * 1000/1000);
        this.series.push(r.sort((a,b)=> a-b));
      });
      this.makeChart();
   //   this.highlightBar()
    });
*/
    this.dataService.years$.subscribe(years => {
      this.years = years;
      if (this.chart) {
        this.highlightBar();
      }
    });
  }

  highlightBar(): void {
    const vals: number[] = [];
    let cts = 0;
    const p = this.chart.series[0].data.forEach((e: { category: string; y: number; update: (arg0: { color: string; }, arg1: boolean) => void; }) => {
      if (this.years.find(y => y.toString() === e.category)) {
        vals.push(e.y);
        e.update({color: '#265668'}, false);
      } else {
        e.update({color: '#64676b'}, false);
      }
    });
    vals.forEach(count => cts = cts + count);
    cts = Math.ceil(cts / vals.length);
    this.chart.setTitle({text: this.years.join(', ') + ' Median time in clinical development'}, {text: '< '  + cts + ' years'});
    this.chart.redraw();
  }

  makeChart(): void {
    const ctrl = this;
    // Generate the chart
    const options: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      colors: ['#64676b'],
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.x}</span><br>',
        pointFormat: '<b>{point.y}</b><br/>'
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function () {
               // ctrl.dataService.changeYears([Number(this.category)]);
              }
            }
          }
        }
      },
      xAxis: {
        title: {
          text: null
        },
        categories: ['2017', '2016', '2015', '2014', '2013', '2012'],
        labels: {
          step: 1
        },
      },
      yAxis: {
        title: {
          text: 'Years'
        }
      },
     /* plotOptions: {
        boxplot: {
          fillColor: '#64676b'
        }
      },
*/
      series: [{
        data: ctrl.series
      }]
    };
    this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }


  ngOnDestroy() {
    this.chart = null;
  }

}
