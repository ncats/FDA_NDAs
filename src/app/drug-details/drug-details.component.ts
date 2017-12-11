import {Component, Input, OnInit} from '@angular/core';
import {Drug} from "../models/drug";

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css']
})
export class DrugDetailsComponent implements OnInit {
  @Input() drug:Drug;

  constructor() { }

  ngOnInit() {
  }

}
