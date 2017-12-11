import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataLoaderService} from "./services/data-loader.service";
import {MatTableDataSource, MatSort} from "@angular/material";
import {Drug} from "./models/drug";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterViewInit {
  displayedColumns = ['product', 'ingredients', 'newIngredients', 'timeline', 'details', 'references', 'use', 'notes'];
  data :  Drug[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataLoaderService: DataLoaderService){}

  ngOnInit(){
    this.dataLoaderService.getData("assets/2017-drugs.csv").subscribe(res =>this.dataSource.data = res);
    console.log(this);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}

