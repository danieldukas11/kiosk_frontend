import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RoutingService } from '../shared/services/routing.service';
import { MenuService } from '../shared/services/menu.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subscription, Observable, from } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {updateOrder} from '../shared/ngrx/actions/order.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  imgUrl = environment.staticUrl + 'images/';
  Subscriptions: Subscription[] = [];
  menu: any;
  menu$: Observable<[]>;
  orders: any[] = [];
  orders$: Observable<[]>;
  tax = 5;
  constructor(
    public rs: RoutingService,
    private router: Router,
    private store: Store<any>,
    private MS: MenuService,
  ) {
    this.orders$ = store.pipe(select('orders'));
    this.menu$ = store.pipe(select('menu'));

   }
  ngOnInit() {
    this.Subscriptions.push(
      this.menu$.subscribe((m) => {
        this.menu = JSON.parse(JSON.stringify(m));
        this.Subscriptions.push(
          this.orders$.subscribe((data) => {
            this.orders = (JSON.parse(JSON.stringify(data)));
            if (this.orders && this.orders.length) {
              this.orders.forEach((o) => {
               this.menu.forEach( me => {
                 me.products.forEach((p, i) => {
                   if (o._id === p._id) {
                     me.products[i] = o;
                   }
                 });
               });
              });
            }
          }),
        );
      })
    );
  }


 addCustomProduct(prod) {

  prod.selectedIngrs = [];
  prod.selectedSpeces = [];
  prod.defSpeces = [];
  prod.ingredients.forEach(i => {
    i.ingrs = [];
    i.defaults.forEach(d => {
      d.selected_qty = 'Included';
      d.isDefault = true;
      d.selected = true;
      i.ingrs.push(d);
      prod.selectedIngrs.push(d);
    });
    i.optionals.forEach(o => {
      o.selected_qty = null;
      o.isDefault = false;
      o.selected = false;
      i.ingrs.push(o);
    });
  });
  prod.sizes[1].qty = 1;
  this.router.navigateByUrl(`menu/${prod._id}/ingredients`, {state: prod});
 }
  increaseQty(prod, ind) {
    prod.sizes[ind].qty++;
    this.updateOrder(prod);
  }

  decreaseQty(prod, ind) {
    if (prod.sizes[ind].qty > 0) {
      prod.sizes[ind].qty--;
    }
    this.updateOrder(prod);

  }
  updateOrder(prod) {
    if (prod.sizes[0].qty === 0 && prod.sizes[1].qty === 0) {
      this.orders = this.orders.filter((order) => {
        return order._id !== prod._id;
      });
    } else {
      this.addOrReplace(prod);
    }
    console.log(this.orders);
    this.store.dispatch(updateOrder(JSON.parse(JSON.stringify({order: this.orders}))));
  }

  addOrReplace(prod) {
    for ( let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id === prod._id) {
        this.orders[i] = prod;
        return;
      }
    }
    this.orders.push(prod);
  }

  ngOnDestroy() {
    this.Subscriptions.forEach(s => s.unsubscribe());
  }

}
