import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataLoaderService} from '../services/data-loader.service';


@Component({
  selector: 'app-drug-counts',
  templateUrl: './drug-counts.component.html',
  styleUrls: ['./drug-counts.component.css']
})

export class DrugCountsComponent implements OnInit, OnDestroy {
  @ViewChild('countChartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;
  series: number[]=[];

  constructor(private  dataLoaderService: DataLoaderService) {
  }

  ngOnInit() {
    this.dataLoaderService.data$.subscribe(res => {
    [...res.values()].forEach(drugs => this.series.push(drugs.length));
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
        text: '49 innovative drugs in 2017'
      },
      subtitle: {
        text: 'a high-water mark for drug development'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      colors: ['#642F6C'],
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
          text: null
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
