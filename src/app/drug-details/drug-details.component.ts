import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Drug} from '../models/drug';
import {MatSort, MatTableDataSource} from '@angular/material';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css']
})
export class DrugDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['fullDate', 'name', 'ingredients', 'target', 'use', 'references'];
  backup: Drug[] = [];
  checked = {
    first: false,
    orphan: false,
    fastTrack: false,
    breakthrough: false,
    priority: false,
    accelerated: false
  };

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private drugHoverService: DrugHoverService,
              private dataService: DataService
  ) {}


  ngOnInit() {
    this.dataService.data$.subscribe(res => {
      let data: Drug[] = [];
      [...res.data.values()].forEach(year => data = data.concat(year));
      this.backup = data;
      this.dataSource.data = data;
    });

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

  drugClick(drug: Drug) {
    this.drugHoverService.clickedNode(drug);
  }

  hover(drug: Drug) {
    this.drugHoverService.clickedNode(drug);
  }
}
