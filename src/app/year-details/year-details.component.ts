import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataService} from '../services/data.service';
import {DataLoaderService} from '../services/data-loader.service';
import {combineLatest} from 'rxjs';
import {Drug} from '../models/drug';
import {YearsService} from '../services/years.service';

declare var require: any;
const ANNOTATIONS: any = require('highcharts/modules/annotations');
ANNOTATIONS(Highcharts);

@Component({
  selector: 'app-year-details',
  templateUrl: './year-details.component.html',
  styleUrls: ['./year-details.component.css']
})
export class YearDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('historyChartTarget', {static: true}) chartTarget!: ElementRef;
  masterDataMap: Map<number, any[]> = new Map();
  min!: Drug;
  max!: Drug;
  median!: number;
  years!: number[];
  history!: any[];
  chart: any;


  constructor(private dataLoaderService: DataLoaderService,
              private dataService: DataService,
              private yearsService: YearsService,
              private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
    const dataMap$ = this.dataLoaderService.data$;
    const yearList$ = this.dataService.years$;
    const historyList$ = this.yearsService.data$;


    combineLatest(dataMap$, yearList$, historyList$)
      .subscribe(obs => {
        this.masterDataMap = obs[0];
        this.years = obs[1];
        this.history = obs[2];
        this.makeChart();

        this.years.forEach(year => {
          const point = this.chart.series[0].data.filter((d: { category: number; }) => d.category === year)[0];
          point.select(true, true);
          this.chart['tooltip'].refresh(point);
        });
      });
  }

  makeChart(): void {
    const ctrl = this;
    // Generate the chart
    const options: any = {
       title: {
        text: 'Novel Drugs 1941-2021'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      colors: ['#265668'],
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.x}</span><br>',
        pointFormat: '<b>{point.y}</b><br/>'
      },
      annotations: [  {
        labelOptions: {
          shape: 'connector',
          align: 'left'
        },
        labels: [{
          point: {
            xAxis: 0,
            yAxis: 0,
            x: 1996,
            y: 50
          },
          text: 'PDUFA clears NDA backlog (1996)'
        }, {
          point: {
            xAxis: 0,
            yAxis: 0,
            x: 2018,
            y: 60
          },
          text: '60 novel drugs (2018)'
        }]
      }],
      xAxis: {
        title: {
          text: null
        },
        endOnTick: 0
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [{
        data: ctrl.history
      }]
    };
    this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }


  ngOnDestroy() {
    this.chart = null;
  }


}
