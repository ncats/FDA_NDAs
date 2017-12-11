import {Component, Input, OnInit} from '@angular/core';
import {Drug} from "../models/drug";

@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.css']
})
export class DrugCardComponent implements OnInit {
@Input() drug:Drug;
  constructor() { }

  ngOnInit() {
  }

}
