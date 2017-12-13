import { Injectable } from '@angular/core';
import {Drug} from '../models/drug';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DrugHoverService {

  private _hoveredNodeSource = new Subject<any>();
  hoverednode$ = this._hoveredNodeSource.asObservable();

  constructor() { }
  hoveredNode(drug: Drug[]): void {
    this._hoveredNodeSource.next(drug);
  }

}
