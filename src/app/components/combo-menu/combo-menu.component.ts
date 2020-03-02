import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { environment } from '../../../environments/environment';
import { RoutingService } from '../../shared/services/routing.service';


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

  getimage(image){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.imgUrl}${image}`, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      var img = document.getElementById(image);
      img.setAttribute( 'src',window.URL.createObjectURL(this.response))       
    };
    xhr.send();
  }

  getCombo(combo){
    combo.menus=combo.menus.filter(m=>{
      return m.default&&m.default.length&&m.products&&m.products.length
    })
    let data={
      type:"combo",
      product:combo
    }
    this.rs.setRoute("combo")
    this.ms.addForPay({prod:combo,action:"add",special:true})   
    console.log(combo)
    this.ms.addProduct(data)
  }


}
