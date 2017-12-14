import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  chart: Highcharts.ChartObject;
  drilldown: any[] = [];
  products: string[] = [];
  dataMap: Map<number, any[]> = new Map();
  mmm: any;
  series: any = [];

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService,
              private filterService: FilterService) {
  }

  ngOnInit() {
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
        // this half tracks the global molecule type and total counts
        let moleculeType = obj.drug.moleculeType.toLowerCase();
        let totals: any = typeCountMap.get(moleculeType);
        let yearCounts: Map<number, number>;
        if(!totals) {
          totals= {total:0, yearly: new Map()};
        }
         let count: number = totals.total;
          // this is a map of counts by year for a molecule type
          yearCounts= totals.yearly;
          // this tracks the counts by year
           let localYearCount: number = yearCounts.get(year);
            if(!localYearCount){
              localYearCount = 0;
            }
          localYearCount++;
          yearCounts.set(year, localYearCount);
          count++;
        typeCountMap.set(moleculeType, {total: count, yearly:yearCounts});
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
            ctrl.filterService.filterString(e.seriesOptions.name, 'moleculeType');
          },
          drillup: function (e) {
            ctrl.filterService.clearFilter();
          }
        }
      },
      title: {
        text: 'FDA approved Drugs by Type 2012-2017'
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
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
      },
      series: [{
        name: 'Molecule Type',
        allowPointSelect: true,
        colorByPoint: true,
        data: this.series
      }],
      drilldown: {
        series: this.drilldown
      }
    };
    this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }

  ngOnDestroy() {
    this.chart = null;
  }
}
