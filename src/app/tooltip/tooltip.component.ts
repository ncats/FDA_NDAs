import {Component, Input} from '@angular/core';
import {Drug} from '../models/drug';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent{
@Input() drug!: Drug;
}
