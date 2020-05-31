import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {loadMenu} from '../shared/ngrx/actions/menu.action';
import { Observable, Subscription } from 'rxjs';
import { updateOrder } from '../shared/ngrx/actions/order.action';
import {DestructComponent} from '../destruct/destruct.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild(DestructComponent) destruct: DestructComponent;
  imgUrl = environment.staticUrl + 'images/';
  orders: any[] = [];
  orders$: Observable<any[]> = this.orderStore.pipe(select('orders'));
  sub: Subscription;
  tax = 5;
  constructor(
    private router: Router,
    private menuStore: Store<{ menu: any[] }>,
    private orderStore: Store<{orders: any[]}>,
  ) {
    this.router.navigate(['menu/products']);
   }
  ngOnInit() {
    this.menuStore.dispatch(loadMenu());
    this.sub = this.orders$.subscribe((data) => {
      this.orders = JSON.parse(JSON.stringify(data));
    });
  }
  getOrders(orders: any[]) {
    return orders.filter((o) => o.customizable === false);
  }
  getCustomOrders(orders: any[]) {
    return orders.filter((o) => o.customizable === true);
  }
  makeOrder() {
    if (this.orders && this.orders.length) {
      this.router.navigate(['/menu/products', { outlets: { payment: ['start'] } }]);
    }
  }
  cancelAll() {
    this.router.navigateByUrl('/');
  }

  checkUrl(url) {
    const u = this.router.url.split('/');
    return u[u.length - 1] === url;
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
  getTax(ammount, tax) {
    return Math.round((ammount * tax / 100) * 100) / 100;
  }
  getTotal(ammount, tax) {
    return Math.round((ammount + (ammount * tax / 100)) * 100) / 100;
  }
  resetTimer() {
   // this.destruct.resetTimer();

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.orderStore.dispatch(updateOrder(JSON.parse(JSON.stringify({order: []}))));
  }
}
