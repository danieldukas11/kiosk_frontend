import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }
  $route=new ReplaySubject()
  
  setRoute(route){
    this.$route.next(route)
  }
}
