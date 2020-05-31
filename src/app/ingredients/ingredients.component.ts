import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { updateOrder } from '../shared/ngrx/actions/order.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper') wrapper: ElementRef;
  imgUrl = environment.staticUrl + 'images/';
  Subscriptions: Subscription[] = [];
  orders$: Observable<any[]> = this.orderStore.pipe(select('orders'));
  orders: any[] = [];
  product;
  popupId = '';
  selectedSpec = '';



  constructor(
    private orderStore: Store<{orders: any[]}>,
    private router: Router) {
      this.product = this.router.getCurrentNavigation().extras.state;
      console.log(this.product);
     }

  ngOnInit(): void {
    this.Subscriptions.push(
        this.orders$.subscribe((data) => {
          this.orders = JSON.parse(JSON.stringify(data));
        })
    );
  }
  openPopup(id) {
    this.popupId = id;
  }

  removeIngredient(ingr) {
    ingr.selected_qty = null;
    ingr.selected = false;
    this.product.selectedIngrs = this.product.selectedIngrs.filter(si => si._id !==  ingr._id);
    this.popupId = '';
    console.log(this.product);
  }
  addIngredient(ingr, qty) {
    ingr.selected_qty = qty;
    ingr.selected = true;
    this.product.selectedIngrs = this.product.selectedIngrs.filter(si => si._id !==  ingr._id);
    this.product.selectedIngrs.unshift(ingr);
    this.popupId = '';
    this.product.sizes[0].price = Number(this.product.sizes[0].price);
    this.product.sizes[1].price = Number(this.product.sizes[1].price);
    switch (ingr.selected_qty) {
      case 'Included':
        this.product.sizes[0].price += Number(ingr.price);
        this.product.sizes[1].price += Number(ingr.price);
        break;
      case 'Double':
        this.product.sizes[0].price += Number(ingr.double_price);
        this.product.sizes[1].price += Number(ingr.double_price);
        break;
      case 'Light':
        this.product.sizes[0].price += Number(ingr.light_price);
        this.product.sizes[1].price += Number(ingr.light_price);
        break;
    }
  }
  getIngrPrice(ingr) {
    switch (ingr.selected_qty) {
      case 'Included':
        return ingr.price;
      case 'Double':
        return ingr.double_price;
      case 'Light':
        return ingr.light_price;
    }
  }
  makeOrder(prod) {
    this.orders.push(prod);
    this.orderStore.dispatch(updateOrder(JSON.parse(JSON.stringify({order: this.orders}))));
    this.router.navigateByUrl('/menu/products');
  }

  increaseQty(prod, ind) {
    prod.sizes[ind].qty++;
  }

  decreaseQty(prod, ind) {
    if (prod.sizes[ind].qty > 0) {
      prod.sizes[ind].qty--;
    }
  }
  selectspec(spec) {
    this.product.selectedSpeces = this.product.selectedSpeces.filter((spc) => {
      if (spc.cat_id === spec.cat_id) {spc.selected = false; }
      return spc.cat_id !== spec.cat_id;
    });
    this.selectedSpec = spec._id;
    spec.selected = true;
    this.product.selectedSpeces.push(spec);
  }

  getqty(sq) {
    switch (sq) {
      case 'Included':
        return ' ';
        case 'Double':
        return '(2X) ';
        case 'Light':
        return '(0.5X) ';
    }
  }
  ngOnDestroy() {
    this.Subscriptions.forEach(s => s.unsubscribe());
  }

}
