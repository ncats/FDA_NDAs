import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrugHoverService} from '../services/drug-hover.service';
import * as Highcharts from 'highcharts';
import * as Drilldown from 'highcharts/modules/drilldown';
import {DataService} from '../services/data.service';
Drilldown(Highcharts);

@Component({
  selector: 'app-drug-charts',
  templateUrl: './drug-charts.component.html',
  styleUrls: ['./drug-charts.component.css']
})
export class DrugChartsComponent implements OnInit, OnDestroy {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @Input()fields: string[];
  @Input()label: string;
  chart: Highcharts.ChartObject;
  dataMap: Map<number, any[]> = new Map();
  down: boolean;

  constructor(private drugHoverService: DrugHoverService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.data$.subscribe(res => {
      if(!res.filter){
       this.dataMap = res.data;
       this.getDrilldown();
     }
    });
  }

  getDrilldown():void{
    const series: any = [];
    const drilldown: any = [];
    const firstFilterMap: Map<string, any> = new Map();
    this.dataMap.forEach((drugs, year) => {
      // first filter --starting with map by year
      drugs.map(obj => {
        // this half tracks the global field and total counts
        const field = obj[this.fields[0]];
        let firstFilterCounts = firstFilterMap.get(field);
        if (!firstFilterCounts) {
          firstFilterCounts = {total: 0, filtered: new Map()};
        }
        let localCount: number = firstFilterCounts.filtered.get(obj[this.fields[1]]);
        if (!localCount) {
          localCount = 0;
        }
        localCount++;
        // this should be the second level data
        firstFilterCounts.filtered.set(obj[this.fields[1]], localCount);
        firstFilterCounts.total++;
        firstFilterMap.set(field, firstFilterCounts);
      });
    });
    firstFilterMap.forEach((val, key) => {
      series.push({name: key, y: val.total, drilldown: key});
      const data: any[] = [];
      val.filtered.forEach((count, field) => {
        data.push([field, count]);
      });
      drilldown.push({name: key, id: key, data: data});
    });
    this.makeChart(series, drilldown);
  }

  makeChart(series:any, drilldown:any):void {
    const ctrl = this;
    // Generate the chart
    const options = {
      chart: {
        type: 'pie',
        events: {
          drilldown: function (e) {
            ctrl.down = true;
            ctrl.dataService.filterString(e.seriesOptions.name, ctrl.fields[0]);
          },
          drillup: function (e) {
            ctrl.down = false;
            ctrl.dataService.clearFilter(true);
          }
        }
      },
      title: {
        text: 'FDA approved Drugs by ' + ctrl.label
      },
      subtitle: {
        text: 'Click the slices to drill down.'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}'
          },
          point: {
            events: {
              mouseOver: function () {
                if (ctrl.down) {
                  //  ctrl.dataService.filterString(this.name, 'year');
                }
             //   console.log(this);
              },
              mouseOut: function () {
                if (ctrl.down) {
                  //   ctrl.dataService.clearFilter();
                }
              }
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
      },
      series: [{
        name: ctrl.label,
        allowPointSelect: true,
        colorByPoint: true,
        data: series
      }],
      drilldown: {
        series: drilldown
      }
    };
    this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }

  ngOnDestroy () {
    this.chart = null;
  }
}
