import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FilterService {

  private _filterSource = new Subject<any>();
  filter$ = this._filterSource.asObservable();

  constructor() { }
  filterString(term: string, field: string ): void {
    console.log(term);
    console.log(field);
    this._filterSource.next({term: term, field: field});
  }

  clearFilter(): void {
    this._filterSource.next("clear");
  }
}
