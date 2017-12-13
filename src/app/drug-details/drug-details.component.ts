import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Drug} from '../models/drug';
import {MatSort, MatTableDataSource} from '@angular/material';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataLoaderService} from '../services/data-loader.service';

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css']
})
export class DrugDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'ingredients', 'newIngredients', 'date', 'details', 'references', 'use', 'notes'];
  data: Drug[] = [];
  timeline;
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService
  ) {}

  ngOnInit() {
    this.dataLoaderService.getData('assets/2012-2017-drugs.csv').subscribe();
    this.dataLoaderService.data$.subscribe(res => this.dataSource.data = res);
    this.drugHoverService.hoverednode$.subscribe(drug => {
      this.dataSource.data = Array.from(new Set([drug].concat(this.dataSource.data)));
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
