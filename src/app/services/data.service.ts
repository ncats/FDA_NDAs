import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {DataLoaderService} from './data-loader.service';
import {environment} from '../../environments/environment.prod';

const YEAR = environment.selectedYear;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  years: number[] = [YEAR];
  private _dataSource = new Subject<any>();
  data$ = this._dataSource.asObservable();
  private _yearChange = new BehaviorSubject<any>(this.years);
  years$ = this._yearChange.asObservable();
  private _applicationChange = new BehaviorSubject<any>({});
  application$ = this._applicationChange.asObservable();
  masterDataMap: Map<number, any[]> = new Map();
  returnedDataMap: Map<number, any[]> = new Map();


  constructor(private dataLoaderService: DataLoaderService) {
    // initial passing of data
    this.dataLoaderService.data$.subscribe(res => {
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

    this._dataSource.next({data: this.returnedDataMap, filters: fields});
  }

  clearFilter(keepData?: boolean): void {
    this.returnedDataMap.clear();
    this.years.forEach(year => {
      this.returnedDataMap.set(year, this.masterDataMap.get(year));
    });
    this._dataSource.next({data: this.returnedDataMap, filter: keepData, filters : []});
  }

  // filter for when the years change
  filterByYear(years: number[]): void {
    this.years = years;
    this.returnedDataMap.clear();
    this.years.forEach(year => {
      this.returnedDataMap.set(year, this.masterDataMap.get(year));
    });
    this._yearChange.next(this.years);
    this._dataSource.next({data: this.returnedDataMap});
  }
}
