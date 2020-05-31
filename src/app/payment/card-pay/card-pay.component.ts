import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-card-pay',
  templateUrl: './card-pay.component.html',
  styleUrls: ['./card-pay.component.scss']
})
export class CardPayComponent implements OnInit {
  @Input() total;
  constructor(
  ) { }

  ngOnInit() {
  }


}
