import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from './shared/services/menu.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(/*private menuService: MenuService, private socket: Socket*/) {}
  ngOnInit() {
   /* this.socket.emit('get-kiosk-menu');
    this.socket.on('update-kiosk-menu', (data) => {
      console.log(data);
    });*/
  }
  ngOnDestroy() {
  }

}
