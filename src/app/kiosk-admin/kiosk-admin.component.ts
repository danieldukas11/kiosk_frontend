import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kiosk-admin',
  templateUrl: './kiosk-admin.component.html',
  styleUrls: ['./kiosk-admin.component.scss']
})
export class KioskAdminComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    sessionStorage.clear();
  }

}
