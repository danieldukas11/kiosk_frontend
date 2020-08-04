import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { Store, select } from '@ngrx/store';
import {loadKiosk} from '../shared/ngrx/actions/kiosk.action';
import { Observable, Subscription } from 'rxjs';
import { updateOrder } from '../shared/ngrx/actions/order.action';
import {MessageType} from "../shared/enums/card-payment-enums";
import {CardPaymentService} from "../shared/services/card-payment.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgUrl = environment.staticUrl + 'images/';
  videoUrl =   environment.staticUrl + 'videos/';
  data;
  data$ = this.kioskStore.pipe(select('data'));
  constructor(private kioskStore: Store<{ data: any[] }>,private _cardPayment: CardPaymentService) { }

  ngOnInit() {
    this.kioskStore.dispatch(loadKiosk());
    this.data$.subscribe((data) => {
      this.data = JSON.parse(JSON.stringify(data));
    });

    this._cardPayment.getCardPaymentSettings().subscribe((settings) => {
      this._cardPayment.startSubscriptionToSocket(settings);
    })
  }
  authorize() {
    return localStorage.getItem('user');
  }

}
