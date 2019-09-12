import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-combo-menu',
  templateUrl: './combo-menu.component.html',
  styleUrls: ['./combo-menu.component.scss']
})
export class ComboMenuComponent implements OnInit {
  public imgUrl=environment.staticUrl +'images/';

  constructor(
    public ms:MenuService,
    private router:Router
  ) { }

  ngOnInit() {
    this.ms.specials.subscribe((data)=>{
      console.log(data)
    })
  }

  getCombo(combo){
    let data={
      type:"special",
      product:combo
    }
    console.log(combo)
    this.router.navigateByUrl('menu/combo',{state:data})
  }


}
