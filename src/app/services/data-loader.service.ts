import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {Drug} from '../models/drug';

@Injectable()
export class DataLoaderService {

  private _dataSource = new Subject<any>();
  //  Observable navItem stream
  data$ = this._dataSource.asObservable();
  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'})
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
    for (let i of lines) {
      const obj: Drug = new Drug();
      const currentline = i.split(',');

      for (let j in headers) {
        obj[headers[j]] = currentline[j];
      }
      obj.date = Date.parse(obj.dateString);
      result.push(obj);

    }
    this._dataSource.next(result);
  }
}

