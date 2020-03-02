import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { MenuService } from '../../shared/services/menu.service';
import { environment } from '../../../environments/environment';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit, OnDestroy {
  mId = '';
  selectedProd;
  Subscriptions = [];
  menu;
  public imgUrl = environment.staticUrl + 'images/';
  constructor(
    private ms: MenuService,
    private rs: RoutingService
  ) { }

  ngOnInit() {
    this.Subscriptions.push(
      this.ms.Menu.subscribe((dat) => {
        this.menu = dat;
    }),
    );
  }
  continue(prod , menuId) {
    if (prod.sizable) {
      prod.sizes = prod.sizes.filter((size) => size.title !== prod.size.title);
      prod.size.selected = true;
      prod.sizes.unshift(prod.size);
      this.changeSize(prod, menuId);
    } else if (prod.customizable) {
      this.customize(prod);
    }
  }
  changeSize(prod, id) {
    this.mId = id;
    this.selectedProd = JSON.parse(JSON.stringify(prod));
  }
  order(size) {
    this.selectedProd.size = size;
    this.selectedProd.price = this.selectedProd.size.price;
    delete this.selectedProd.sizes;
    if (this.selectedProd.customizable) {
      this.customize(this.selectedProd);
    } else {
      delete this.selectedProd.customizable;
      delete this.selectedProd.sizable;
      delete this.selectedProd.image;
      delete this.selectedProd.defaults;
      delete this.selectedProd.ingredients,
      this.selectedProd.size = this.selectedProd.size.title;
      this.ms.addForPay({prod: this.selectedProd, action: 'add'});
    }
    this.mId = '';
    this.selectedProd = null;
  }
  customize(prod) {
    const data = {
      type: 'product',
      product: prod
    };
    this.ms.addForPay({ prod, action: 'add'});
    this.ms.addProduct(JSON.parse(JSON.stringify(data)));
    this.rs.setRoute('customize');
  }
  ngOnDestroy() {
    this.Subscriptions.forEach(s => s.unsubscribe());
  }



}
