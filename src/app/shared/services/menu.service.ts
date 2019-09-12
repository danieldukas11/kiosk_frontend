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
  public product=new ReplaySubject();

  constructor(
    private http:HttpClient
  ) { }
  getMenu(){  
    return this.http.get(`${environment.url}/menu`)  
  }

 setMenu(data){
   this.Menu.next(data)
 }
 setSpecials(data){
  this.specials.next(data)
}
 
 getSpecials(){
   return this.http.get(`${environment.url}/specials`)
 }
 addProduct(prod){
  this.product.next(prod)
}

}
