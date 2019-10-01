import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';
import { Product } from '../models/product.model';
import {HttpClient} from '@angular/common/http'
import { from, ReplaySubject } from 'rxjs';
import {environment} from '../../../environments/environment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public Menu=new BehaviorSubject([]);
  public specials=new BehaviorSubject([]);
  public product=new BehaviorSubject([]);
  public forPay=new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) { }

  getMenu(){  
    return this.http.get(`${environment.url}/menu`)  
  }

  setMenu(data){
    this.Menu.next(JSON.parse(JSON.stringify(data)))
  }

  getSpecials(){
    return this.http.get(`${environment.url}/specials`)
  }

  setSpecials(data){
    this.specials.next(JSON.parse(JSON.stringify(data)))
  }    

 addProduct(prod){
  this.product.next(JSON.parse(JSON.stringify(prod)))
}

addForPay(data){
  this.forPay.next(JSON.parse(JSON.stringify(data)))
}

}
