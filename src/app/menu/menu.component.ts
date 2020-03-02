import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../shared/services/menu.service';
import { environment } from '../../environments/environment';
import { RoutingService } from '../shared/services/routing.service';
import {PaymentService} from '../shared/services/payment.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  imgUrl = environment.staticUrl + 'images/';
  Subscriptions = [];
  orders = [];
  route;
  tax = 5;
  constructor(
    private MS: MenuService,
    private rs: RoutingService,
    private router: Router,
    private loc: PlatformLocation,
    private ps: PaymentService
  ) {
   }

  ngOnInit() {
    this.rs.setRoute('menu');
    this.router.navigate(['menu']);
    this.loc.onPopState(() => {
      this.rs.setRoute('');
      this.router.navigate(['/']);
    });
    this.Subscriptions.push(
      this.MS.getMenu().subscribe((data) => {
                this.MS.setMenu(data);
      }),
      this.MS.getSpecials().subscribe((data) => {
        this.MS.setSpecials(data);
      }),
      this.MS.forPay.subscribe((data: any) => {
        if (data.action === 'add') {
          data.prod.isSpecial = data.special;
          data.prod.quantity = 1;
          this.orders.push(data.prod);
        } else if (data.action === 'update') {
          data.prod.isSpecial = data.special;
          data.prod.quantity = 1;
          this.orders.pop();
          this.orders.push(data.prod);
        }
      }),
      this.rs.$route.subscribe(route => {
        this.route = route;
      })
    );
  }

  getPrice(order) {
    return Math.round(order.price * 100 * order.quantity) / 100;
  }
  ngOnDestroy() {
    this.rs.setRoute('');
    this.orders = [];
    this.MS.addForPay('');
    this.ps.setPaymentData([]);
    this.rs.setPayRoute(false);
    this.Subscriptions.forEach(s => s.unsubscribe());
  }


  getTotal() {
    return  this.orders.reduce((a, b) => {
      return Math.round((a + b.price * b.quantity) * 100) / 100; } , 0);
  }
  getTax() {
    return Math.round((this.getTotal() * this.tax / 100) * 100 ) / 100;
  }
  getPay() {
    return Math.round((this.getTotal() + this.getTax()) * 100) / 100;
  }

  goBack() {
    switch (this.route) {
      case 'menu':
      this.router.navigate(['/']);
      break;
      case 'customize':
      this.rs.setRoute('menu');
      break;
      case 'combo':
      this.rs.setRoute('menu');
      break;
      case 'customize-combo-prod':
      this.rs.setRoute('combo');
      break;
    }
  }

  pay() {
    this.ps.setPaymentData(this.orders);
    this.rs.setPayRoute(true);
  }


}
