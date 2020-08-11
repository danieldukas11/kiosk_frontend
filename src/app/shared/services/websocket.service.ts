import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;

  constructor() {
    console.log(environment.socketUrl)
    this.socket = io(environment.socketUrl);
  }

  emit(eventName: string, data: any = {}) {
    console.log('emitting')
    this.socket.emit(eventName, data);
  }

  on(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
