import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DataLoaderService} from './services/data-loader.service';
import {LoadingService} from './services/loading.service';
import {DataService} from './services/data.service';
import {DOCUMENT} from '@angular/common';
import {Drug} from './models/drug';
import {combineLatest} from 'rxjs/observable/combineLatest';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading = true;
  masterDataMap: Map<number, any[]> = new Map();
  years: number[] = [];
  navIsFixed: boolean;
  min: Drug;
  max: Drug;
  median: number;

  constructor(private dataLoaderService: DataLoaderService,
              private loadingService: LoadingService,
              private dataService: DataService,
              @Inject(DOCUMENT) private document: Document) {
    this.dataLoaderService.getData('assets/2012-2017-NMEs.csv').subscribe();
  }

@HostListener('window:scroll', [])
  ngOnInit(): void {
    const dataMap$ = this.dataLoaderService.data$;
    const yearList$ = this.dataService.years$;
    const loading$ = this.loadingService.loading$;

    combineLatest(dataMap$, yearList$, loading$)
      .subscribe(obs => {
        this.masterDataMap = obs[0];
        this.years = obs[1];
        this.loading = obs[2];
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

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  scrollToTop() { (function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
  }
}


