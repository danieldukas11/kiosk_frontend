import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/shared/services/routing.service';


@Component({
  selector: 'app-combo-menu',
  templateUrl: './combo-menu.component.html',
  styleUrls: ['./combo-menu.component.scss']
})
export class ComboMenuComponent implements OnInit {
  public imgUrl=environment.staticUrl +'images/';

  constructor(
    public ms:MenuService,
    private rs:RoutingService,
  ) { }

  ngOnInit() {
    
  }

  getCombo(combo){
    let data={
      type:"combo",
      product:combo
    }
    this.rs.setRoute("combo")
    this.ms.addProduct(data)
  }


}
