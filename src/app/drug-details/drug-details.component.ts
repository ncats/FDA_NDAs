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
  checked ={
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
  ){}


  ngOnInit() {
    this.dataService.data$.subscribe(res => {
      let data: Drug[] =[];
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

  toggleFilter (event: any, filter: string): void {
    console.log(event);
    this.checked[filter] = !this.checked[filter];
    if(event.checked) {
      this.dataService.filterBoolean(filter);
    }else{
      this.dataService.clearFilter();
    }

  /*  let filtered: Drug[] = this.backup;
    let filters: string[] = [];
    for (let field in this.checked){
      if (this.checked[field]){
        filters.push(field);
      }
    }

    filters.forEach(filter=> filtered = filtered.filter(drug => !!drug[filter] === true));


    this.dataSource.data = filtered.filter((elem, pos, arr) =>  arr.indexOf(elem) == pos);*/
  }
  getCount(field:string):number {
  const r = this.dataSource.data.filter((drug) => !!drug[field] ===true);
  return r.length;
  }
  }
