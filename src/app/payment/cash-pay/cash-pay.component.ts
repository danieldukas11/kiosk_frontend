import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cash-pay',
  templateUrl: './cash-pay.component.html',
  styleUrls: ['./cash-pay.component.scss']
})
export class CashPayComponent implements OnInit,OnDestroy {
@Input() total;
@Output() oncheckAmmount = new EventEmitter();
inserted = 0;
subject;
subscription: Subscription;
  constructor(
  ) {
    this.subject = webSocket('ws://localhost:7288');
  }

  ngOnInit() {
    this.subscription = this.subject.subscribe((data) => {
      switch (data.code) {
        case 1778:
          this.inserted += data.ammount / 100;
          this.oncheckAmmount.emit(this.inserted);
          break;
      }
    });
    this.subject.next({message: 'turn_cash_on', code: 1775});
  }
  ngOnDestroy() {
    this.subject.next({message: 'turn_cash_off', code: 1111});
    this.subscription.unsubscribe();
  }


}
