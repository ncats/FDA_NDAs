import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Drug} from '../models/drug';
import * as moment from 'moment';
import {environment} from '../../environments/environment.prod';

const URL = environment.dataUrl;

@Injectable()
export class DataLoaderService {

  private _dataSource = new Subject<any>();
  //  Observable navItem stream
  data$ = this._dataSource.asObservable();
  dataMap: Map<number, any[]> = new Map();

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(URL, {responseType: 'text'})
      .pipe(
        map(response => this.csvJSON(response.trim())),
        catchError(this.handleError('getData', []))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private csvJSON(csv): void {
    const lines: string[] = csv.split(/\r\n|\n/);
    const result: any[] = [];

    const headers = lines.shift().split(',');
    for (const i of lines) {
      const obj: Drug = new Drug();
      const currentline = i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      for (const j in headers) {
        obj[headers[j]] = currentline[j].replace(/"/g,'');
      }
      const d = obj.dateString.split('/');
      obj.date = moment(d[0] + '/' + d[1], "MM/DD").valueOf(); // MM/DD
      obj.moleculeType = obj.moleculeType.toLowerCase();
      obj.fullDate = moment(obj.dateString, "MM/DD/YYYY").valueOf();
      obj.year =  Number(obj.dateString.split('/')[2]);
      obj.developmentTime = this.getDevTime(obj);

      let yearList: any[] = this.dataMap.get(obj.year);
      if (yearList && yearList.length > 0) {
        yearList.push(obj);
      }else {
        yearList = [obj];
      }
      this.dataMap.set(obj.year, yearList);
      //  result.push(obj);
    }
    console.log(this.dataMap);
    this._dataSource.next(this.dataMap);
  }

  getDevTime(drug: Drug): number {
    let start: any;
    if (drug.initClinicalStudy && drug.initClinicalStudy.toString() !== "?") {
      start = moment('01/01/'.concat(drug.initClinicalStudy.toString()),"MM/DD/YYYY");
    }else {
      start = moment(drug.nctDate, "MM/DD/YYYY");
    }
    const end = moment(drug.fullDate);
    /*const d1Y = start.getFullYear();
    const d2Y = end.getFullYear();
    const d1M = start.getMonth();
    const d2M = end.getMonth();
    return Number((((d2M + 12 * d2Y) - (d1M + 12 * d1Y)) / 12).toFixed(2));*/
    return end.diff(start, 'years', true);

  }
}
