import { Component,OnInit, HostListener, ViewChild, ElementRef, AfterViewInit,OnDestroy } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit,OnDestroy {
  menu=[];
  Subscriptions=[];
  imgUrl=environment.staticUrl +'images/';
  constructor(
    private ms:MenuService,
    private router:Router
  ) { }
  ngOnInit() {
    this.Subscriptions.push(
      this.ms.Menu.subscribe((dat)=>{
      this.menu=dat
  })
    )
  
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s => s.unsubscribe())    
  }
  getProduct(product){
    this.router.navigateByUrl('menu/ingredients',{state:product})    
  }

@ViewChild("wrapper", {static:false}) wrap:ElementRef
nwrapper
ngAfterViewInit(){
  this.nwrapper=this.wrap.nativeElement
}
 


  gotoTop() {
    this.nwrapper.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });   
  }
  gotoBottom() {
    this.nwrapper.scroll({ 
      top:this.nwrapper.scrollHeight, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
