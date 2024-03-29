import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {DataLoaderService} from '../services/data-loader.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import {environment} from '../../environments/environment.prod';

const YEARS = environment.selectedYears;

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  displayedColumns = ['select', 'filter', 'count'];
  series: any[] = [];
  yearDataSource = new MatTableDataSource<any>(this.series);
  yearSelection = new SelectionModel<number>(true, YEARS);
  applicationDataSource = new MatTableDataSource<any>([
    {name: 'First in class', value: 'first', icon: 'verified_user'},
    {name: 'Orphan Designation', value: 'orphan', icon: 'child_friendly'},
    {name: 'Fast Track', value: 'fastTrack', icon: 'flight_takeoff'},
    {name: 'FDA Breakthrough Designation', value: 'breakthrough', icon: 'trending_up'},
    {name: 'Priority Review', value: 'priority', icon: 'visibility'},
    {name: 'FDA Accelerated Approval', value: 'accelerated', icon: 'fast_forward'},
    {name: 'Black Box Warning', value: 'blackBox', icon: 'check_box_outline_blank'},
    {name: 'Diagnostic Imaging Agent', value: 'diagnosticImaging', icon: 'image'},
    {name: 'FDA Animal Rule Approval', value: 'animalRule', icon: 'pets'}
    ]);
  applicationSelection = new SelectionModel<any>(true, []);
  checked: {[n:string]: boolean} = {
    first: false,
    orphan: false,
    fastTrack: false,
    breakthrough: false,
    priority: false,
    accelerated: false,
    blackBox: false,
    diagnosticImaging: false,
    animalRule: false
  };
  stop = false;
  years: number[] = YEARS;
  dataMap: Map<number, any[]> = new Map();


  constructor(private dataService: DataService,
              private dataLoaderService: DataLoaderService) { }

  ngOnInit() {
    console.log(this);
    this.dataLoaderService.data$.subscribe(res => {
      res.forEach((value: string | any[], key: any) => {
        this.series.push({key: key, count: value.length});
      });
      this.yearDataSource.data = this.series.sort((a,b) => b.key-a.key);
    });

    this.dataService.data$.subscribe(res => this.dataMap = res.data);

    this.dataService.years$.subscribe(years => {
      console.log(years);
      this.stop = true;
    // /  years.forEach(year => this.yearSelection.toggle(year));
    //  this.yearSelection.deselect(...this.years);
    //  this.yearSelection.select(...years);
      this.years = years;
    });

    this.yearSelection.changed.subscribe(change => {
   //   if (!this.stop) {
        this.dataService.filterByYear(this.yearSelection.selected);
     // }
    ////  this.stop = false;
      });

    this.applicationSelection.changed.subscribe(change => {
      console.log(change);
      change.added.forEach(field => this.checked[field] = true);
      change.removed.forEach(field => this.checked[field] = false);
      if (this.applicationSelection.selected.length === 0) {
        this.dataService.clearFilter();
      } else {
        this.dataService.filterBoolean(this.applicationSelection.selected);
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllYearSelected() {
    const numSelected = this.yearSelection.selected.length;
    const numRows = this.yearDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterYearToggle() {
    this.isAllYearSelected() ?
      this.yearSelection.clear() :
      this.yearDataSource.data.forEach(row => this.yearSelection.select(row.key));
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllApplicationSelected() {
    const numSelected = this.applicationSelection.selected.length;
    const numRows = this.applicationDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterApplicationToggle() {
    this.isAllApplicationSelected() ?
      this.applicationSelection.clear() :
      this.applicationDataSource.data.forEach(row => this.applicationSelection.select(row.value));
  }

  getCount(field: string): number {
    let sum = 0;
    if (this.dataMap && this.dataMap.size > 0) {
      this.dataMap.forEach(drugs => {
        sum = sum + drugs.filter(drug => !!drug[field] === true).length;
      });
      return sum;
    }
    return sum;
  }
}
