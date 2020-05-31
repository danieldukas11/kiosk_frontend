import { Component, OnInit } from '@angular/core';
import {KioskService} from '../shared/services/kiosk.service';
import { Router } from '@angular/router';
import {ToasterService} from 'angular2-toaster';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  pin = '';
  subscribtion;
  constructor(private ks: KioskService, private router: Router, private toasterService: ToasterService) { }

  ngOnInit(): void {
  }
  text(t) {
    if ( this.pin.length < 4) {
      this.pin += t;
    }
  }

  setPin(pin) {
    this.subscribtion = this.ks.loginByPin(pin).subscribe(data => {
      sessionStorage.setItem('pin', data.toString());
      this.subscribtion.unsubscribe();
      this.router.navigateByUrl('kioskadmin');

    },
    err => this.toasterService.pop('error',  err.error)
    );
  }
  backSpace(pin) {
    return pin.substr(0, pin.length - 1);
  }

}
