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

  data: any[] = [];
  products: string[] = [];
  chart: Highcharts.ChartObject;

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService) {
  }

  ngOnInit() {
    this.dataLoaderService.data$.subscribe(res => {
      this.products = res.map(drug => drug.name);
      this.data = res.map(drug => {
        return {x: drug.date, y: res.indexOf(drug), drug: drug};
      });
      this.makeChart();
    });
  }

  makeChart() {
    // Generate the chart
    console.log(this);
    const ctrl = this;
      const options = {
        chart: {
          type: 'scatter',
          height: '35%'
        },
        colors: ['#673ab7'
        ],
       title: {
         text: 'FDA approved Drugs in 2017'
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
         data: this.data
       }],
        tooltip: {
          formatter: function () {
            return '<b>' + this.point.drug.name +
              '</b> approved <b>' + this.point.drug.dateString + '</b>';
          }
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Products'
          },
          categories: this.products,
          reversed: true,
          labels: {
            padding: 10,
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
