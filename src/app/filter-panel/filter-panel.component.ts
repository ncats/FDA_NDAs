import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {
  yearFilterCtrl: FormControl;
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
/*    this.yearFilterCtrl = new FormControl([2017]);
    this.yearFilterCtrl.valueChanges.subscribe(value => {
      this.dataService.filterByYear(value);
    });*/
  }

  toggleFilter (event: any, filter: string): void {
    console.log(event);
    this.checked[filter] = !this.checked[filter];
    if (event.checked) {
      this.dataService.filterBoolean(filter);
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
