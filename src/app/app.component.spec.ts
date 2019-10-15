import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MaterialModule} from '../assets/material/material.module';
import {NcatsHeaderComponent} from './ncats-header/ncats-header.component';
import {NcatsFooterComponent} from './ncats-footer/ncats-footer.component';
import {DrugChartsComponent} from './drug-charts/drug-charts.component';
import {DrugCountsComponent} from './drug-counts/drug-counts.component';
import {DrugDetailsComponent} from './drug-details/drug-details.component';
import {TimeCountsComponent} from './time-counts/time-counts.component';
import {TimelineComponent} from './timeline/timeline.component';
import {FilterPanelComponent} from './filter-panel/filter-panel.component';
import {YearDetailsComponent} from './year-details/year-details.component';
import {DataLoaderService} from './services/data-loader.service';
import {DataService} from './services/data.service';
import {LoadingService} from './services/loading.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {YearsService} from './services/years.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DrugHoverService} from './services/drug-hover.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NcatsHeaderComponent,
        NcatsFooterComponent,
        DrugChartsComponent,
        DrugCountsComponent,
        DrugDetailsComponent,
        TimeCountsComponent,
        TimelineComponent,
        FilterPanelComponent,
        YearDetailsComponent
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        DataLoaderService,
        DataService,
        LoadingService,
        YearsService,
        DrugHoverService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
 /* it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));*/
});
