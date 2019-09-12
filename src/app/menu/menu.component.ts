import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../shared/services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit,OnDestroy {
  imgUrl=environment.staticUrl +'images/';
  Subscriptions=[];
  orders=[]

  constructor(
    private MS:MenuService
  ) { }

  ngOnInit() {
    this.Subscriptions.push(
      this.MS.getMenu().subscribe((data)=>{
        this.MS.setMenu(data)
      }),
      this.MS.getSpecials().subscribe((data)=>{
        this.MS.setSpecials(data)
      }),
      this.MS.product.subscribe((data:any)=>{

        data.id=new Date().getTime()
        data.quantity=1
        this.orders.push(data)
      })
      
    )
    
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s => s.unsubscribe())    
  }
  addProd(id){   
   for(let order of this.orders){
     if (order.id==id){
       order.quantity++
     }
   }
    
  }
  removeProd(id){    
    for(let order of this.orders){
      if (order.id==id){
        if(order.quantity>1){
          order.quantity--
        }        
      }
    }    
  }
  getPrice(order){
    return Math.round(order.price*10*order.quantity)/10
  }
  getTotal(){
    return  this.orders.reduce((a, b)=>{return Math.round((a+b.price*b.quantity)*10)/10},0)   
  }
  getTax(){
    return Math.round((this.getTotal()*5/100)*10)/10
  }
  getPay(){
    return Math.round((this.getTotal()+this.getTax())*100)/100
  }
 

}
