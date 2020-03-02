import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cash-pay-finish',
  templateUrl: './cash-pay-finish.component.html',
  styleUrls: ['./cash-pay-finish.component.scss']
})
export class CashPayFinishComponent implements OnInit {
  @Input() total
  @Input() inserted
  @Output() OnFinish=new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  finish(){
    this.OnFinish.emit("")
  }
}
