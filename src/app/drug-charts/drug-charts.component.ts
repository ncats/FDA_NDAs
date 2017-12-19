import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataLoaderService} from '../services/data-loader.service';
import * as Highcharts from 'highcharts';
import * as Drilldown from 'highcharts/modules/drilldown';
import {FilterService} from '../services/filter.service';
import {YearFilterService} from '../services/year-filter.service';
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
  drilldown: any[] = [];
  products: string[] = [];
  dataMap: Map<number, any[]> = new Map();
  down: boolean;
  series: any = [];
  dataIn: any = [];
  years: number[] = [2017];

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService,
              private filterService: FilterService,
              private yearFilterService: YearFilterService) {
  }

  ngOnInit() {
    console.log(this);
    this.dataLoaderService.data$.subscribe(res => {
      this.dataMap = res.years;
      this.getDrilldown();
    });
   /* this.dataLoaderService.data$.subscribe(res => {
      this.dataMap = res.years;
      const data: any[] =[];
      this.years.forEach(year => {
        data.push({name:year.toString(), data: this.dataMap.get(year)});
      });
      this.series = data;
      this.makeChart();
    });
*/
    this.yearFilterService.year$.subscribe(years => {
      // todo keep master list, and get from that, this way the data ca be cleared on change
      this.years = years;
      const data: any[] = [];
      // prefilter by years selected
      this.years.forEach(year => {
        data.push({name: year, data: this.dataMap.get(year)});
      });
      this.dataIn = data;
      this.getDrilldown();
      console.log(this);
    });

  }

  getDrilldown() {
    const countMap: Map<string, number> = new Map();
    const firstFilterMap: Map<string, any> = new Map();

    this.dataIn.forEach((drugs) => {
      // first filter --starting with map by year
      const yearCountMap: Map<number, number> = new Map();
      drugs.data.map(obj => {
        // this half tracks the global field and total counts
        const field = obj[this.fields[0]];
        let totals: any = firstFilterMap.get(field);
        let firstFilterCounts: Map<string, number> = firstFilterMap.get(field);
        if (!totals) {
          totals = {total: 0, filtered: new Map()};
        }
         let count: number = totals.total;
          // this is a map of counts by year for a field
        firstFilterCounts = totals.filtered;
          // this tracks the counts by year
           let localYearCount: number = firstFilterCounts.get(obj[this.fields[1]]);
            if (!localYearCount) {
              localYearCount = 0;
            }
          localYearCount++;
            // this should be the second level data
        firstFilterCounts.set(obj[this.fields[1]], localYearCount);
          count++;
        firstFilterMap.set(field, {total: count, filtered: firstFilterCounts});
      });
    });
    console.log(firstFilterMap);
    firstFilterMap.forEach((val, key) => {
      console.log(key);
      this.series.push({name: key, y: val.total, drilldown: key});
      const data: any[] = [];
      console.log(val);
      val.filtered.forEach((count, field) => {
        console.log(field);
        data.push([field, count]);
      });
      this.drilldown.push({name: key, id: key, data: data});
    });
    console.log(this);
    this.makeChart();
  }

filterString(event: any): void {

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
            ctrl.filterService.filterString(e.seriesOptions.name, ctrl.fields[0]);
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

  ngOnDestroy () {
    this.chart = null;
  }
}
