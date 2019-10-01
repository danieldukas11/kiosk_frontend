import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }
  $route=new BehaviorSubject("")
  
  setRoute(route){
    this.$route.next(route)
    console.log(route)
  }
}
