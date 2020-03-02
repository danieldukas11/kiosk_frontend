import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  $paymentData=new BehaviorSubject([])

  constructor() { }
  setPaymentData(data){
    this.$paymentData.next(JSON.parse(JSON.stringify(data)) )
  }
}
