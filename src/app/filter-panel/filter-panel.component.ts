import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from '../services/data.service';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {
  yearFilterCtrl: FormControl;
  displayedColumns = ['select', 'filter'];
  yearDataSource = new MatTableDataSource<number>([2017, 2016, 2015, 2014, 2013, 2012]);
  yearSelection = new SelectionModel<number>(true, [2017]);
  applicationDataSource = new MatTableDataSource<any>([
    {name: 'First in class', value: 'first'},
    {name: 'Orphan Designation', value: 'orphan'},
    {name: 'Fast Track', value: 'fastTrack'},
    {name: 'FDA Breakthrough Designation', value: 'breakthrough'},
    {name: 'Priority Review', value: 'priority'},
    {name: 'FDA Accelerated Approval', value: 'accelerated'}]);
  applicationSelection = new SelectionModel<any>(true, []);
  checked = {
    first: false,
    orphan: false,
    fastTrack: false,
    breakthrough: false,
    priority: false,
    accelerated: false
  };
  years: number[] = [2017];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  this.yearSelection.onChange.subscribe(change => {
    this.dataService.filterByYear(this.yearSelection.selected);
  });
  this.applicationSelection.onChange.subscribe(change => {
    if (this.applicationSelection.selected.length === 0) {
      this.dataService.clearFilter();
    }else {
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
      this.yearDataSource.data.forEach(row => this.yearSelection.select(row));
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

  toggleRow(): void {

  }

toggleFilter (event: any, filter: string): void {
    console.log(event);
    this.checked[filter] = !this.checked[filter];
    if (event.checked) {
      // t his.dataService.filterBoolean(filter);
    }else {
      this.dataService.clearFilter();
    }
  }
  changeYear(event: any, year: number): void {
    console.log(event);
    console.log(this.years);

    if (event.checked) {
      this.years.push(year);
      this.years = [ ...new Set(this.years)];
    }else {
    this.years = this.years.filter(yearFilter => {
      console.log(yearFilter);
      console.log(year);
      return yearFilter !== year;
    });
    }
    console.log(this.years);
    this.dataService.filterByYear(this.years);
  }
  getCount(field: string): number {
   // const r = this.dataSource.data.filter((drug) => !!drug[field] === true);
  //  return r.length;
    return 666;
  }
}
