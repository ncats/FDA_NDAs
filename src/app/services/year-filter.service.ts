import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class YearDataService {

  private _yearFilterSource = new Subject<any>();
  year$ = this._yearFilterSource.asObservable();

  constructor() { }

 filterByYear(year:number[]):void {
   // console.log(year);
    this._yearFilterSource.next(year);
 }
}
