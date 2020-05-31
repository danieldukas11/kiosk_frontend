import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cash-pay-finish',
  templateUrl: './cash-pay-finish.component.html',
  styleUrls: ['./cash-pay-finish.component.scss']
})
export class CashPayFinishComponent implements OnInit {
  @Input() paid;
  @Input() price;
  constructor() { }

  ngOnInit() {
  }
  getPayout(paid, price) {
    return Math.round((paid - price) * 100) / 100;
  }
}
