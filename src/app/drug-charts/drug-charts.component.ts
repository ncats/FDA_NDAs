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
    this.dataLoaderService.data$.subscribe(res => {
      this.dataMap = res.years;
      const data: any[] = [];
      this.years.forEach(year => {
        data.push({name: year, data: this.dataMap.get(year)});
      });
      this.dataIn = data;
      this.getDrilldown();
    });
    this.yearFilterService.year$.subscribe(years => {
      // todo keep master list, and get from that, this way the data ca be cleared on change
      this.years = years;
      const data: any[] = [];
      this.dataIn = [];
      this.series = [];
      this.drilldown = [];
      // prefilter by years selected
      this.years.forEach(year => {
        data.push({name: year, data: this.dataMap.get(year)});
      });
      this.dataIn = data;
      this.getDrilldown();
    });

  }

  getDrilldown() {
    const firstFilterMap: Map<string, any> = new Map();
    this.dataIn.forEach((drugs) => {
      // first filter --starting with map by year
      drugs.data.map(obj => {
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
      this.series.push({name: key, y: val.total, drilldown: key});
      const data: any[] = [];
      val.filtered.forEach((count, field) => {
        data.push([field, count]);
      });
      this.drilldown.push({name: key, id: key, data: data});
    });
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
