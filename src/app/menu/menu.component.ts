import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { RoutingService } from '../shared/services/routing.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

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
    private MS:MenuService,
    private rs:RoutingService,
    private router:Router,
    private loc: PlatformLocation
  ) {      
   }

   
  
  ngOnInit() {    
    this.rs.setRoute("menu")
    this.router.navigate(["menu"])
    this.loc.onPopState(()=>{
      this.rs.setRoute('')
      this.router.navigate(["/"])
    })
    this.Subscriptions.push(
      this.MS.getMenu().subscribe((data)=>{
        
        this.MS.setMenu(data)
      }),
      this.MS.getSpecials().subscribe((data)=>{
        console.log(data)
        this.MS.setSpecials(data)
      }),
      this.MS.forPay.subscribe((data:any)=>{
        console.log(data)
      })
      
    )
    
  }
  ngOnDestroy(){
    this.rs.setRoute("")
    
    this.Subscriptions.forEach(s => s.unsubscribe())    
  }
  
  /*addProd(id){   
   for(let order of this.orders){
     if (order.id==id){
       order.quantity++
     }
   }
    
  }*/

  






 /* removeProd(id){    
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
  }*/
 

}
