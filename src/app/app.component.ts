import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './animmations/navigation.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ 
    fadeAnimation
  ]
    
})
export class AppComponent {
  public getRouterOutletState(outlet:RouterOutlet) {
   
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
