import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataService} from "../services/data.service";
import {DataLoaderService} from "../services/data-loader.service";
import {combineLatest} from 'rxjs';
import {Drug} from "../models/drug";
import {YearsService} from "../services/years.service";
import {default as Annotations} from 'highcharts/modules/annotations';
Annotations(Highcharts);

@Component({
  selector: 'app-year-details',
  templateUrl: './year-details.component.html',
  styleUrls: ['./year-details.component.css']
})
export class YearDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('historyChartTarget') chartTarget: ElementRef;
  masterDataMap: Map<number, any[]> = new Map();
  min: Drug;
  max: Drug;
  median: number;
  years: number[];
  history: any[];
  year2017 = false;
  chart: Highcharts.ChartObject;


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
        this.year2017 = false;
        // if(this.years.find(y => y === 2017)) {
        //   this.year2017 = true;
        //  this.cd.detectChanges();
        this.makeChart();
      //  this.chart.setTitle({text: 'innovative drugs in ' + this.years.join(', ')});

        this.years.forEach(year => {
          const point = this.chart.series[0].data.filter(d => d.category === year)[0];
          point.select(true, true);
          this.chart['tooltip'].refresh(point);
        })
        //  }
        // this.getOutliers();
        // this.getMedian();
      });
  }

  getMedian() {
    let sum = 0;
    const counts: any[] = [];
    this.years.forEach(year => {
      const r = this.masterDataMap.get(year);
      r.forEach(drug => sum = sum + drug.developmentTime);
      counts.push(Number((sum / r.length).toFixed(2)));
    });
    let s = 0;
    counts.forEach(count => {
      s =  s + count;
    });
    this.median = Number((s / counts.length).toFixed(2));
  }

  getOutliers() {
    const counts: any[] = [];
    this.years.forEach(year => {
      const r = this.masterDataMap.get(year).sort((a, b) => a.developmentTime - b.developmentTime);
      counts.push(r);
    });
    const min: any[] = [];
    const max: any[] = [];
    counts.forEach(year => {
      min.push(year[0]);
      max.push(year[year.length - 1]);
    });
    this.min = min.sort((a, b) => a.developmentTime - b.developmentTime)[0];
    this.max = max.sort((a, b) => a.developmentTime - b.developmentTime)[max.length - 1];
  }

  makeChart(): void {
    const ctrl = this;
    // Generate the chart
    const options: any = {
       title: {
        text: 'Innovative Drugs 1941-2017'
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
          align: 'right'
        },
        labels: [{
          point: {
            xAxis: 0,
            yAxis: 0,
            x: 1996,
            y: 50
          },
          text: '1996: PDUFA helps FDA clear NDA backlog'
        }, {
          point: {
            xAxis: 0,
            yAxis: 0,
            x: 2017,
            y:50
          },
          text: 'Historic number of innovative drugs approved'
        }]
      }],
      xAxis: {
        title: {
          text: null
        }
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
