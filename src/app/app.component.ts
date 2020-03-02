import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { fadeAnimation } from './animmations/navigation.animation';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
