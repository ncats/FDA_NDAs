import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DataLoaderService} from './services/data-loader.service';
import {LoadingService} from './services/loading.service';
import {DataService} from './services/data.service';
import {DOCUMENT} from '@angular/common';
import {YearsService} from "./services/years.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading = true;
  years: number[] = [];
  history: any = [];
  navIsFixed: boolean;


  constructor(private dataLoaderService: DataLoaderService,
              private loadingService: LoadingService,
              private dataService: DataService,
              private yearsService: YearsService,
              @Inject(DOCUMENT) private document: Document) {
    this.dataLoaderService.getData('assets/2012-2017-NMEs.csv').subscribe();
    this.yearsService.getData('assets/years.csv').subscribe();
  }

  ngOnInit(): void {
    this.dataService.years$.subscribe(res =>this.years = res);
    this.loadingService.loading$.subscribe(res =>this.loading = res);
 }



  @HostListener('window:scroll', [])
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


