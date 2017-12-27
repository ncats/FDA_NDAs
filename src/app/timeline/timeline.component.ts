import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {Drug} from '../models/drug';
import * as Highcharts from 'highcharts';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataService} from "../services/data.service";
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting.src.js';
import {LoadingService} from "../services/loading.service";
import {TooltipComponent} from "../tooltip/tooltip.component";


// todo: add exporting module

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;
  series: any = [];

   private _component: ComponentRef<TooltipComponent>;

  constructor(private drugHoverService: DrugHoverService,
              private dataService: DataService,
              private _resolver: ComponentFactoryResolver,
              private _injector: Injector
) {
  }

  ngOnInit() {
    // Initialize exporting module.
    Exporting(Highcharts);
    const factory = this._resolver.resolveComponentFactory(TooltipComponent);
    this._component = factory.create(this._injector);
    this.dataService.data$.subscribe(res => {
      const data: any[] = [];
      [...res.data.entries()].forEach(entry => {
        data.push({name: entry[0], data: res.data.get(entry[0]).map(drug => drug = {x: drug.date, y: drug.year, drug: drug})});
      });
      this.series = data;
      this.makeChart();
    });

    this.drugHoverService.clickednode$.subscribe(drug => {
      const list: any[] = this.chart.series.filter(l => l.name === drug.year);
      const point = list[0].data.filter(d => d['drug'].name === drug.name);
      point[0].setState(point[0].state === 'hover' ? '' : 'hover');
    point[0].select(null, true);
      this.chart['tooltip'].refresh(point[0]);
    });
  }

  makeChart() {
    // Generate the chart
    const ctrl = this;
      const options = {
        chart: {
          type: 'scatter',
          height: '12%'
        },
        colors: ['#642F6C'],
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
          formatter: function() {
            ctrl._component.instance.drug = this.point.drug;
            ctrl._component.changeDetectorRef.detectChanges();
            const element = ctrl._component.location.nativeElement;
           return element.innerHTML;
          },
          shared: true,
          useHTML: true
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%b'
          }
        },
        yAxis: {
          title: {
            text: null
          },
          categories: ['2017', '2016', '2015', '2014', '2013', '2012'],
         labels: {
            step: 1
          },
        }
     };

     this.chart = Highcharts.chart(this.chartTarget.nativeElement, options);
  }

  toggleHighlight() {

  }

  ngOnDestroy() {
   this.chart = null;
    this._component.destroy();
  }
  }
