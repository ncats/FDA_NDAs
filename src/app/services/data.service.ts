import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataLoaderService} from "./data-loader.service";

@Injectable()
export class DataService {
  private _dataSource = new Subject<any>();
  data$ = this._dataSource.asObservable();
  masterDataMap: Map<number, any[]> = new Map();
  returnedDataMap: Map<number, any[]> = new Map();
  years: number[] = [2017];


  constructor(private dataLoaderService: DataLoaderService) {
    // initial passing of data
    this.dataLoaderService.data$.subscribe(res => {
      console.log(res);
      this.masterDataMap = res;
      this.years.forEach(year => {
        this.returnedDataMap.set(year, this.masterDataMap.get(year));
      });
      this._dataSource.next({data: this.returnedDataMap});
    });
  }

  filterString(term: string, field: string ): void {
    [...this.returnedDataMap.keys()].forEach(year => {
      this.returnedDataMap.set(year, this.returnedDataMap.get(year).filter(drug => drug[field] === term));
    });
    this._dataSource.next({data: this.returnedDataMap, filter: true});
  }

  filterBoolean(fields: string[]): void {
    fields.forEach(field => {
      [...this.returnedDataMap.keys()].forEach(year => {
        this.returnedDataMap.set(year, this.returnedDataMap.get(year).filter(drug => !!drug[field] === true));
      });
    });
    this._dataSource.next({data: this.returnedDataMap});
  }

  clearFilter(keepData?: boolean): void {
    this.returnedDataMap.clear();
    this.years.forEach(year => {
      this.returnedDataMap.set(year, this.masterDataMap.get(year));
    });
    this._dataSource.next({data: this.returnedDataMap, filter: keepData});
  }

  // filter for when the years change
  filterByYear(years: number[]): void {
    this.years = years;
    this.returnedDataMap.clear();
    this.years.forEach(year => {
      this.returnedDataMap.set(year, this.masterDataMap.get(year));
    });
    this._dataSource.next({data: this.returnedDataMap});
  }
}
