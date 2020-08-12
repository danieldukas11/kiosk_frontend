import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) {
  }

  getOrdersNum() {
    return this.http.get(`${environment.staticUrl}kitchen/get-orders-num`);
  }
}
