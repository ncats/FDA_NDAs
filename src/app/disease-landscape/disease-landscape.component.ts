import {Component, Input, OnInit} from '@angular/core';
import {Drug} from "../models/drug";

@Component({
  selector: 'app-disease-landscape',
  templateUrl: './disease-landscape.component.html',
  styleUrls: ['./disease-landscape.component.css']
})
export class DiseaseLandscapeComponent implements OnInit {
  @Input() drug:Drug;

  constructor() { }

  ngOnInit() {
  }

}
