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
    allergy_info: '',
    phone: '',
    subTotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    paid: 0,
    user_id: '',
    status: ''
  };
  sub;
  route = 'tip';
  hasTip = false;

  constructor(
    private orderStore: Store<{ orders: any[] }>,
    private socket: Socket,
    private router: Router,
    // private orderService: OrderS
  ) {

  }

  ngOnInit() {
    console.log('payment page');
    this.sub = this.orders$.subscribe((data) => {
      /*if (!data.length) {
        this.router.navigateByUrl('/');
      }*/
      console.log(data);
      if (data && data.length > 0) {
        this.orderData.orderedProducts = JSON.parse(JSON.stringify(data));
        this.orderData.subTotal = this.getSubTotal(this.orderData.orderedProducts);
        this.orderData.tax = Math.round((this.orderData.subTotal * 5 / 100) * 100) / 100;
        this.orderData.total = Math.round((this.orderData.subTotal + this.orderData.tax) * 100) / 100;
        this.orderData.user_id = data[0].user_id;
        this.orderData.status = 'pending';
      }
    });
    console.log('ORDER DATA');
    console.log(this.orderData);
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
    this.orderData.paid = ammount;
    if (ammount >= this.orderData.total) {
      this.route = 'finish_cash';
    }
  }

  setSpecInstruction(data) {
    this.orderData.special_instructions = data;
    this.route = 'tip';
  }

  setAlergyInfo(data) {
    this.orderData.allergy_info = data;
    this.route = 'tip';
  }

  addPhone(phone) {
    this.orderData.phone = phone;
  }

  getOrdersByHttp() {
    // this.ordersService.get().subscribe(dt => {
    //   this.orders = dt;
    // });
  }
}
