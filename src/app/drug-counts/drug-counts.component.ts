import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataLoaderService} from '../services/data-loader.service';
import {DataService} from "../services/data.service";


@Component({
  selector: 'app-drug-counts',
  templateUrl: './drug-counts.component.html',
  styleUrls: ['./drug-counts.component.css']
})

export class DrugCountsComponent implements OnInit, OnDestroy {
  @ViewChild('countChartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;
  series: number[]=[];
  years: number[]=[];

  constructor(private  dataLoaderService: DataLoaderService,
              private  dataService: DataService) {}

  ngOnInit() {
    this.dataLoaderService.data$.subscribe(res => {
    res.forEach(drugs => this.series.push(drugs.length));
      this.makeChart();
      this.highlightBar();
    });

    this.dataService.years$.subscribe(years => {
      this.years = years;
      if (this.chart) {
        this.highlightBar();
      }
    });
  }

  highlightBar(): void {
    let vals:number[] =[];
    let cts:number =0;
      let p = this.chart.series[0].data.forEach(e => {
        if (this.years.find(y => y.toString() === e.category)) {
          vals.push(e.y);
          e.update({color: '#642F6C'}, false);
        }
        else {
          e.update({color: '#64676b'}, false);
        }
      });
    vals.forEach(count => cts=cts+count);
    this.chart.setTitle({text: cts + ' innovative drugs in ' + this.years.join(", ")});
    this.chart.redraw();
  }

  makeChart(): void {
    const ctrl = this;
    // Generate the chart
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      subtitle: {
      //  text: 'a high-water mark for drug development'
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
