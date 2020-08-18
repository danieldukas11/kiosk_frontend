import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public orderData = new Subject<any>();

  constructor() {
  }

  setOrderData(value) {
    this.orderData.next(value);
  }

  getOrderData(): Observable<any> {
    return this.orderData.asObservable();
  }

}
