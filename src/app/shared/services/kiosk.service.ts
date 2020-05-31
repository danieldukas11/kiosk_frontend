import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KioskService {

  constructor( private http: HttpClient) { }
  getKioskData() {
    const usr = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
       user: usr
      })
    };
    return this.http.get(`${environment.url}kiosk_data`, httpOptions);
  }

  login(user) {
    return this.http.post(`${environment.url}login`, user);
  }

  loginByPin(pin) {
    const usr = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
       user: usr
      })
    };
    return this.http.post(`${environment.url}loginbypin`, {pin}, httpOptions);
  }
}
