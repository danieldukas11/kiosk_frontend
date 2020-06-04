import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  orders$: Observable<any[]> = this.orderStore.pipe(select('orders'));
  orderData = {
    orderedProducts: [],
    special_instructions: '',
    alergy_info: '',
    phone: '',
    subTotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    payed: 0,
  };
  sub;
  route = 'tip';
  hasTip = false;

  constructor(
    private orderStore: Store<{ orders: any[] }>,
    private socket: Socket,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.sub = this.orders$.subscribe((data) => {
      /*if (!data.length) {
        this.router.navigateByUrl('/');
      }*/
      this.orderData.orderedProducts = JSON.parse(JSON.stringify(data));
      this.orderData.subTotal = this.getSubTotal(this.orderData.orderedProducts);
      this.orderData.tax = Math.round((this.orderData.subTotal * 5 / 100) * 100) / 100;
      this.orderData.total = Math.round((this.orderData.subTotal + this.orderData.tax) * 100) / 100;
    });
    this.socket.emit('make_order', this.orderData);
  }


  getSubTotal(orders) {
    let price = 0;
    orders.forEach(order => {
      if (order.sizable && !order.customizable) {
        order.sizes.forEach(s => {
          price += s.price * s.qty;
        });
      }
      if (order.sizable && order.customizable) {
        order.sizes.forEach(s => {
          price += s.price * s.qty;
        });
      }
    });
    return Math.round(price * 100) / 100;
  }

  changeRoute(e) {
    this.route = e;
  }

  changeTip(e) {
    this.orderData.tip = e;
    this.orderData.total = Math.round((this.orderData.total + e) * 100) / 100;
    this.hasTip = true;
  }

  checkAmmount(ammount) {
    this.orderData.payed = ammount;
    if (ammount >= this.orderData.total) {
      this.route = 'finish_cash';
    }
  }

  setSpecInstruction(data) {
    this.orderData.special_instructions = data;
    this.route = 'tip';
  }

  setAlergyInfo(data) {
    this.orderData.alergy_info = data;
    this.route = 'tip';
  }

  addPhone(phone) {
    this.orderData.phone = phone;
  }
}
