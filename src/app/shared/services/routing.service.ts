import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }
  $route=new BehaviorSubject("")
  $payRoute=new BehaviorSubject(false)
  
  setRoute(route){
    this.$route.next(route)
  }

  setPayRoute(val){
    this.$payRoute.next(val)
  }
}
