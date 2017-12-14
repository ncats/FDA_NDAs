import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Drug} from '../models/drug';
import {DataLoaderService} from '../services/data-loader.service';
import * as Highcharts from 'highcharts';
import {DrugHoverService} from '../services/drug-hover.service';

// todo: add exporting module

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;
  dataMap: Map<number, any[]> = new Map();

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService) {
  }

  ngOnInit() {
    this.dataLoaderService.data$.subscribe(res => {
      this.dataMap = res.years;
      this.makeChart();
    });
  }

  makeChart() {
    // Generate the chart
    const ctrl = this;
      const options = {
        chart: {
          type: 'scatter',
          height: '35%'
        },
        colors: ['#673ab7'
        ],
       title: {
         text: 'FDA approved Drugs by Year'
       },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: function (event) {
                  ctrl.drugHoverService.hoveredNode(this.drug);
                }
              }
            }
          }
        },
       series: [{
          name: '2017',
         data: ctrl.dataMap.get(2017)
       }, {
         name: '2016',
         data: ctrl.dataMap.get(2016)
       }, {
         name: '2015',
         data: ctrl.dataMap.get(2015)
       }, {
         name: '2014',
         data: ctrl.dataMap.get(2014)
       }, {
         name: '2013',
         data: ctrl.dataMap.get(2013)
       }, {
         name: '2012',
         data: ctrl.dataMap.get(2012)
       }],
        tooltip: {
          formatter: function () {
            return '<b>' + this.point.drug.name +
              '</b> approved <b>' + this.point.drug.dateString + '</b>';
          }
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%b'
          }
        },
        yAxis: {
          categories: ['2017', '2016', '2015', '2014', '2013', '2012'],
          reversed: true,
          labels: {
            step: 1
          },
        }
     };

     this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }

  ngOnDestroy() {
   this.chart = null;
  }
  }
