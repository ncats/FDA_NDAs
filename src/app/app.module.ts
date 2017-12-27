import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import {DataLoaderService} from './services/data-loader.service';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../assets/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DrugHoverService} from './services/drug-hover.service';
import { DrugChartsComponent } from './drug-charts/drug-charts.component';
import {DataService} from "./services/data.service";
import { NcatsHeaderComponent } from './ncats-header/ncats-header.component';
import { NcatsFooterComponent } from './ncats-footer/ncats-footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingService} from "./services/loading.service";
import { TooltipComponent } from './tooltip/tooltip.component';
import { DrugCountsComponent } from './drug-counts/drug-counts.component';
import { TimeCountsComponent } from './time-counts/time-counts.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    DrugDetailsComponent,
    DrugChartsComponent,
    NcatsHeaderComponent,
    NcatsFooterComponent,
    TooltipComponent,
    DrugCountsComponent,
    TimeCountsComponent,
    FilterPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    DataLoaderService,
    DrugHoverService,
    DataService,
    LoadingService
  ],
  entryComponents: [TooltipComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
