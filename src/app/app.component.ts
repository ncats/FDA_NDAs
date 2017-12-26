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
  yearFilterCtrl: FormControl;
  loading: boolean = false;
  masterDataMap: Map<number, any[]> = new Map();


  constructor(private dataLoaderService : DataLoaderService,
              private dataService : DataService,
              private loadingService: LoadingService){
    this.dataLoaderService.getData('assets/2012-2017-NMEs.csv').subscribe();
  }

  ngOnInit():void {
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.dataLoaderService.data$.subscribe(res=> this.masterDataMap = res);
    this.yearFilterCtrl = new FormControl([2017]);
    this.yearFilterCtrl.valueChanges.subscribe(value => {
      this.dataService.filterByYear(value);
    });
  }

  ngAfterViewInit():void{
    this.loadingService.toggleVisible(false);

  }
}


