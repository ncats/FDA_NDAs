import {Component, OnInit} from '@angular/core';
import {DataLoaderService} from "./services/data-loader.service";
import {FormControl} from "@angular/forms";
import {YearFilterService} from "./services/year-filter.service";
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  yearFilterCtrl: FormControl;
  loading: boolean = true;

  constructor(private dataLoaderService : DataLoaderService,
              private yearFilterService : YearFilterService,
              private loadingService: LoadingService){}

  ngOnInit():void{
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.dataLoaderService.getData('assets/2012-2017-NMEs2.csv').subscribe();
    this.yearFilterCtrl = new FormControl([2017]);
    this.yearFilterCtrl.valueChanges.subscribe(value => {
      console.log(value);
      this.yearFilterService.filterByYear(value);
    });
  }
}


