import {Component, Input, OnInit} from '@angular/core';
import {Drug} from "../models/drug";

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
@Input() drug: Drug;
  constructor() { }

  ngOnInit() {
    console.log(this.drug);
  }

}
