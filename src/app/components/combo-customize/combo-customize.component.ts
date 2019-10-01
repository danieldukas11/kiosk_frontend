import { Component, OnInit,OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-combo-customize',
  templateUrl: './combo-customize.component.html',
  styleUrls: ['./combo-customize.component.scss']
})
export class ComboCustomizeComponent implements OnInit {
  product
  openTypeId=""
  type
  Subscriptions=[]
  public imgUrl=environment.staticUrl +'images/';

  constructor(
    private ms:MenuService,
    private rs:RoutingService
  ) { }

  ngOnInit() {
    this.Subscriptions.push(
      this.ms.product.subscribe((dat:any)=>{
        this.type=dat.type     
        this.product= dat.product
          console.log(dat.product)
           
      }),
    )
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s=>s.unsubscribe())
  }


  getSelected(id,selected_id){
 
      if(selected_id==id){
        return "selected"
      }
    return ""
  }


}
