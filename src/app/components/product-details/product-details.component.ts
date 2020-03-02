import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { environment } from '../../../environments/environment';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public imgUrl=environment.staticUrl +'images/';
  public images
  public type:string
  public product  
  public quickProd
  route
  public Subscriptions=[];
  constructor(
    private ms:MenuService,
    private rs:RoutingService
  ) { }

  ngOnInit() {
    this.route=this.rs.$route.subscribe(route=>{
      if(route=="customize-combo-prod"){
        this.Subscriptions.push(
          this.ms.comboPrord.subscribe((dat:any)=>{
            this.type=dat.type
            this.quickProd=JSON.parse(JSON.stringify(dat.product));
            console.log(dat.product)
            this.product=dat.product

          })
        )
      }
    else{
      this.Subscriptions.push(
        this.ms.product.subscribe((data:any)=>{
        this.type=data.type;
        this.quickProd=JSON.parse(JSON.stringify(data.product));      
        this.product=data.product
        if(this.type=="combo"){
          this.product.price=0
          this.product.menus.forEach(menu => {            
            if(menu.default&&menu.default.length ){
              this.product.price=(this.product.price*1000 + menu.default[0].price*1000)/1000
            }
           
          });
        }
        })
      )
    }

    })
    
   
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s => s.unsubscribe())  
    this.route.unsubscribe()  

  }

  next(){    
    this.rs.setRoute("combo")
  }

  cancel(){
    this.rs.setRoute("menu")
  }


}
