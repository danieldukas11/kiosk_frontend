import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';

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
  public Subscriptions=[];

  constructor(
    private ms:MenuService
  ) { }

  ngOnInit() {
    this.Subscriptions.push(
      this.ms.product.subscribe((data:any)=>{
      this.type=data.type;
      this.quickProd=JSON.parse(JSON.stringify(data.product));      
      this.product=data.product
      console.log(this.product)
      })
    )
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s => s.unsubscribe())    

  }

}
