import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DrugHoverService} from "../services/drug-hover.service";
import {DataLoaderService} from "../services/data-loader.service";
import * as Highcharts from 'highcharts';
import * as Drilldown from 'highcharts/modules/drilldown';
import {FilterService} from "../services/filter.service";
Drilldown(Highcharts);

@Component({
  selector: 'app-drug-charts',
  templateUrl: './drug-charts.component.html',
  styleUrls: ['./drug-charts.component.css']
})
export class DrugChartsComponent implements OnInit {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @Input()field: string;
  @Input()label: string;
  chart: Highcharts.ChartObject;
  drilldown: any[] = [];
  products: string[] = [];
  dataMap: Map<number, any[]> = new Map();
  down:boolean = false;
  series: any = [];

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    console.log(this);
    this.dataLoaderService.data$.subscribe(res => {
      this.dataMap = res.years;
      this.getDrilldown();
    });
  }

  getDrilldown(){
    const countMap: Map<string, number> = new Map();
    const typeCountMap: Map<string, any> = new Map();
    this.dataMap.forEach((drugs, year)=>{
      const yearCountMap: Map<number, number> = new Map();
      drugs.map(obj=>{
        // this half tracks the global field and total counts
        let field = obj.drug[this.field];
        let totals: any = typeCountMap.get(field);
        let yearCounts: Map<number, number>;
        if(!totals) {
          totals= {total:0, yearly: new Map()};
        }
         let count: number = totals.total;
          // this is a map of counts by year for a field
          yearCounts= totals.yearly;
          // this tracks the counts by year
           let localYearCount: number = yearCounts.get(year);
            if(!localYearCount){
              localYearCount = 0;
            }
          localYearCount++;
          yearCounts.set(year, localYearCount);
          count++;
        typeCountMap.set(field, {total: count, yearly:yearCounts});
      })
    });

    typeCountMap.forEach((val, key)=>{
      this.series.push({name:key, y: val.total, drilldown:key});
      const data: any[] = [];
      val.yearly.forEach((count, year)=>{
        data.push([year.toString(),count, val.drugs]);
      });
      this.drilldown.push({name:key, id:key, data: data})
    });
    console.log(this);
    this.makeChart();
  }

filterString(event:any):void{

}

  makeChart() {
    const ctrl = this;
    // Generate the chart
    const options = {
      chart: {
        type: 'pie',
        events: {
          drilldown: function (e) {
            ctrl.down = true;
            ctrl.filterService.filterString(e.seriesOptions.name, ctrl.field);
          },
          drillup: function (e) {
            ctrl.down = false;
            ctrl.filterService.clearFilter();
          }
        }
      },
      title: {
        text: 'FDA approved Drugs by ' + ctrl.label + ' 2012-2017'
      },
      subtitle: {
        text: 'Click the slices to view by year.'
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
                  //  ctrl.filterService.filterString(this.name, 'year');
                }
                console.log(this);
              },
              mouseOut: function () {
                if (ctrl.down) {
                  //   ctrl.filterService.clearFilter();
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
        data: this.series
      }],
      drilldown: {
        series: this.drilldown,
      }
    };
    this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }

  ngOnDestroy() {
    this.chart = null;
  }
}
