import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getMenu() {
    const usr = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        user: usr
      })
    };
    return this.http.get(`${environment.url}/menu`, httpOptions);
  }

  setMenu(data) {
    this.Menu.next(JSON.parse(JSON.stringify(data)));
  }
 addProduct(prod) {
  this.product.next(prod);
}

addForPay(data) {
  this.forPay.next(JSON.parse(JSON.stringify(data)));
}

}
