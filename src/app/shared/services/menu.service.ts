import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';
import { Product } from '../models/product.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { from, ReplaySubject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public Menu = new BehaviorSubject([]);
  public specials = new BehaviorSubject([]);
  public product = new BehaviorSubject([]);
  public forPay = new BehaviorSubject([]);
  public comboPrord = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) { }
  login(user) {
    return this.http.post(`${environment.url}login`, user);
  }

  getMenu() {
    const id = localStorage.getItem('terminal_id');
    const httpOptions = {
      headers: new HttpHeaders({
        terminal_id: id
      })
    };
    return this.http.get(`${environment.url}/menu`, httpOptions);
  }

  setMenu(data) {
    this.Menu.next(JSON.parse(JSON.stringify(data)));
  }

  getSpecials() {
    const id = localStorage.getItem('terminal_id');
    const httpOptions = {
      headers: new HttpHeaders({
        terminal_id: id
      })
    };
    return this.http.get(`${environment.url}/specials`, httpOptions);
  }

  setSpecials(data) {
    this.specials.next(JSON.parse(JSON.stringify(data)));
  }

 addProduct(prod) {
  this.product.next(prod);
}
comboProdCustomize(data) {
  this.comboPrord.next(data);
}

addForPay(data) {
  this.forPay.next(JSON.parse(JSON.stringify(data)));
}

}
