import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataLoaderService} from '../services/data-loader.service';

@Component({
  selector: 'app-time-counts',
  templateUrl: './time-counts.component.html',
  styleUrls: ['./time-counts.component.css']
})

export class TimeCountsComponent implements OnInit, OnDestroy {
  @ViewChild('timeCountChartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;
  series: number[]= [];

  constructor(private  dataLoaderService: DataLoaderService) {
  }

  ngOnInit() {
    this.dataLoaderService.data$.subscribe(res => {
      [...res.values()].forEach(drugs => {
        let sum = 0;
        drugs.map(drug => sum = sum + drug.developmentTime);
        this.series.push(Number((sum / drugs.length).toFixed(2)));
      });
      this.makeChart();
    });
  }

  makeChart(): void {
    const ctrl = this;
    // Generate the chart
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: '2017 Median time in clinical development'
      },
      subtitle: {
        text: '< 8 years'
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
