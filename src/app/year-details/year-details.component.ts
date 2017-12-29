import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {DataLoaderService} from "../services/data-loader.service";
import {combineLatest} from 'rxjs/observable/combineLatest';
import {Drug} from "../models/drug";

@Component({
  selector: 'app-year-details',
  templateUrl: './year-details.component.html',
  styleUrls: ['./year-details.component.css']
})
export class YearDetailsComponent implements OnInit {
  masterDataMap: Map<number, any[]> = new Map();
  min: Drug;
  max: Drug;
  median: number;
  years: number[];
  year2017 = false;

  constructor(private dataLoaderService: DataLoaderService,
              private dataService: DataService,

  ) { }

  ngOnInit() {
    const dataMap$ = this.dataLoaderService.data$;
    const yearList$ = this.dataService.years$;

    combineLatest(dataMap$, yearList$)
      .subscribe(obs => {
        this.masterDataMap = obs[0];
        this.years = obs[1];
        this.year2017 = false;
        if(this.years.find(y => y === 2017)) {
          this.year2017 =true;
        }
        this.getOutliers();
        this.getMedian();
      });
  }



  getMedian() {
    let sum = 0;
    const counts: any[] = [];
    this.years.forEach(year => {
      const r = this.masterDataMap.get(year);
      r.forEach(drug => sum = sum + drug.developmentTime);
      counts.push(Number((sum / r.length).toFixed(2)));
    });
    let s = 0;
    counts.forEach(count => {
      s =  s + count;
    });
    this.median = Number((s / counts.length).toFixed(2));
  }

  getOutliers() {
    const counts: any[] = [];
    this.years.forEach(year => {
      const r = this.masterDataMap.get(year).sort((a, b) => a.developmentTime - b.developmentTime);
      counts.push(r);
    });
    const min: any[] = [];
    const max: any[] = [];
    counts.forEach(year => {
      min.push(year[0]);
      max.push(year[year.length - 1]);
    });
    this.min = min.sort((a, b) => a.developmentTime - b.developmentTime)[0];
    this.max = max.sort((a, b) => a.developmentTime - b.developmentTime)[max.length - 1];
  }


}
