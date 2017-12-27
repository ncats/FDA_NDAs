import {Component, OnInit} from '@angular/core';
import {DataLoaderService} from "./services/data-loader.service";
import {FormControl} from "@angular/forms";
import {LoadingService} from "./services/loading.service";
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading = true;
  masterDataMap: Map<number, any[]> = new Map();
  years: number[] = [];


  constructor(private dataLoaderService: DataLoaderService,
              private loadingService: LoadingService,
              private dataService: DataService) {
    this.dataLoaderService.getData('assets/2012-2017-NMEs.csv').subscribe();
  }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.dataLoaderService.data$.subscribe(res => this.masterDataMap = res);
    this.dataService.years$.subscribe(years => this.years = years);
  }
}


