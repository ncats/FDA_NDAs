import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Drug} from '../models/drug';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DrugDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['fullDate', 'developmentTime', 'name', 'ingredients', 'target', 'use', 'references'];
  backup: Drug[] = [];
  checked: {[n:string]: boolean} = {
    first: false,
    orphan: false,
    fastTrack: false,
    breakthrough: false,
    priority: false,
    accelerated: false,
    blackBox: false,
    diagnosticImaging: false,
    animalRule: false
  };

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private drugHoverService: DrugHoverService,
              private dataService: DataService
  ) {}


  ngOnInit() {
    this.dataService.data$.subscribe(res => {
      console.log(res);

      let data: Drug[] = [];
      [...res.data.values()].forEach(year => data = data.concat(year));
      this.backup = data;
      this.dataSource.data = data;
      if (res.filters) {
        this.checked = {
          first: false,
          orphan: false,
          fastTrack: false,
          breakthrough: false,
          priority: false,
          accelerated: false,
          blackBox: false,
          diagnosticImaging: false,
          animalRule: false
        };
        res.filters.forEach((field: string) => this.checked[field] = true);
      }
    });

    this.drugHoverService.hoverednode$.subscribe(drug => {
      this.dataSource.data = Array.from(new Set([drug].concat(this.dataSource.data)));
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: KeyboardEvent) {
    console.log(filterValue.target)
    console.log(filterValue)
   // filterValue = filterValue.trim(); // Remove whitespace
   // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //  this.dataSource.filter = filterValue;
  }

  drugClick(drug: Drug) {
    this.drugHoverService.clickedNode(drug);
  }

  hover(drug: Drug) {
    this.drugHoverService.clickedNode(drug);
  }

  getColor(prop: string): string {
    return this.checked[prop] ? 'primary' : '';
  }
  }
