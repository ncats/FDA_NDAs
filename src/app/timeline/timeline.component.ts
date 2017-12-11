import {Component, Input, OnInit} from '@angular/core';
import {Drug} from "../models/drug";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input() drug:Drug;

  constructor() { }

  ngOnInit() {
  }

}
