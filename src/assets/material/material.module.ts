/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule,
  MatListModule, MatSliderModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatSidenavModule,
  MatSlideToggleModule, MatRadioModule, MatCheckboxModule, MatTabsModule, MatCardModule, MatTooltipModule,
  MatSelectModule, MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule],
  exports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule],
})
export class MaterialModule { }

