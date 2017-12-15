import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Drug} from '../models/drug';
import {MatSort, MatTableDataSource} from '@angular/material';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataLoaderService} from '../services/data-loader.service';
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css']
})
export class DrugDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'ingredients', 'newIngredients', 'fullDate', 'details', 'references', 'use', 'notes'];
  data: Drug[] = [];
  backup: Drug[] = [];
  timeline;
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataLoaderService: DataLoaderService,
              private drugHoverService: DrugHoverService,
              private filterService: FilterService
  ) {}

  ngOnInit() {
    this.dataLoaderService.getData('assets/2012-2017-NMEs.csv').subscribe();
    this.dataLoaderService.data$.subscribe(res => {
      this.backup = res.drugs;
      this.dataSource.data = res.drugs
    });
    this.drugHoverService.hoverednode$.subscribe(drug => {
      this.dataSource.data = Array.from(new Set([drug].concat(this.dataSource.data)));
    });

    this.filterService.filter$.subscribe(filter => {
      if(filter =="clear"){
        this.dataSource.data= this.backup;
      }
      console.log(filter);
      this.dataSource.data = this.dataSource.data.filter(drug => drug[filter.field] === filter.term);
    });
  }

  ngAfterViewInit() {
    console.log(this);
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  drugClick(drug:Drug){
    console.log(drug);
    this.drugHoverService.clickedNode(drug);
  }

  hover(drug:Drug){
    console.log(drug);
    this.drugHoverService.clickedNode(drug);
  }
}
