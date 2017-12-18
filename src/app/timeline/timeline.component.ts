import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Drug} from '../models/drug';
import {DataLoaderService} from '../services/data-loader.service';
import * as Highcharts from 'highcharts';
import {DrugHoverService} from '../services/drug-hover.service';
import {FilterService} from "../services/filter.service";
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting.src.js';
import {YearFilterService} from "../services/year-filter.service";
import {LoadingService} from "../services/loading.service";
// Initialize exporting module.


// todo: add exporting module

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;
  years: number[] = [2017];
  series: any = [];

  dataMap: Map<number, any[]> = new Map();

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService,
              private filterService: FilterService,
              private yearFilterService: YearFilterService,
              private loadingService: LoadingService,
) {
  }

  ngOnInit() {
    Exporting(Highcharts);
    this.dataLoaderService.data$.subscribe(res => {
      this.dataMap = res.years;
      const data: any[] =[];
      this.years.forEach(year => {
        data.push({name:year.toString(), data: this.dataMap.get(year)});
      });
      this.series = data;
      this.makeChart();
    });

    this.yearFilterService.year$.subscribe(years =>{
      this.years = years;
      const data: any[] =[];
      this.years.forEach(year => {
        data.push({name:year.toString(), data: this.dataMap.get(year)});
      });
      this.series = data;
      this.makeChart();
    });

    this.drugHoverService.clickednode$.subscribe(drug => {
      let list:any[] = this.chart.series.filter(l => l.name === drug.year);
      const point = list[0].data.filter(d =>d['drug'].name === drug.name);
      point[0].setState(point[0].state==='hover'? '': 'hover');
    point[0].select(null, true);
      this.chart['tooltip'].refresh(point[0]);
    });


    this.filterService.filter$.subscribe(filter => {
      console.log(filter);
     /* let list:any[] = this.chart.series.filter(l => l.name === drug.year);
      console.log(list);
      const point = list[0].data.filter(d =>d['drug'].name === drug.name);
      console.log(point);
      point[0].setState(point[0].state==='hover'? '': 'hover');
      point[0].select(null, true);
      this.chart['tooltip'].refresh(point[0]);
      this.dataSource.data = this.dataSource.data.filter(drug => drug[filter.field] === filter.term);*/
    });
  }

  makeChart() {
    // Generate the chart
    const ctrl = this;
      const options = {
        chart: {
          type: 'scatter',
          height: '15%'
        },
        colors: ['#673ab7'
        ],
       title: {
         text: null
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
       series: ctrl.series,
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
          title:{
            text: null
          },
          categories: ['2017', '2016', '2015', '2014', '2013', '2012'],
         labels: {
            step: 1
          },
        }
     };

     this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
     this.loadingService.toggleVisible(false);
  }

  toggleHighlight(){

  }

  ngOnDestroy() {
   this.chart = null;
  }
  }
