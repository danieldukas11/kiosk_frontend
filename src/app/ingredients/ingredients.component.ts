import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';
import { environment } from 'src/environments/environment';
import {MenuService} from '../shared/services/menu.service'

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  imgUrl=environment.staticUrl +'images/';
  state$: Observable<object>;
  product:Product;
  opentTab=false;
  tabId="";
  Subscriptions=[];
  @ViewChild("wrapper", {static:false}) wrap:ElementRef;
  nwrapper
  ngAfterViewInit(){
    this.nwrapper=this.wrap.nativeElement
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private Ms:MenuService
  ) { }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state))    
    this.Subscriptions.push( 
      this.state$.subscribe((data:Product)=>{      
        this.product=data         
      })
    )
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s => s.unsubscribe())    
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

  addIngredientTab(dat){
    this.opentTab=true
    this.tabId=dat    
  }
  closeTab(){
    this.opentTab=false
    this.tabId=""
  }
  getDefault(id){
   let d= this.product.defaults.find((a)=>{
      return a._id==id
    })
  
    return d
  }

  removeIngredient(ing){    
    this.product.price=(this.product.price*10-ing.price*10)/10
    this.product.defaults=this.product.defaults.filter((def)=>{
      return def._id!=ing._id
    })
  
    this.closeTab()
  }
  addIngredient(ing, quant){    
    ing.quantity=quant=="light"?"X0.5":quant=="double"?"X2":""
    this.product.defaults.unshift(ing);
    this.product.price=(this.product.price*10+ing.price*10)/10
    this.closeTab()
  }

  order(product:Product){
    let ingredients=[...product.defaults]
    ingredients.forEach((ingr)=>{
      delete ingr._id;
      delete ingr.image;
      delete ingr.price
    })
   let prod={
     title:product.title,
     price:product.price,
     ingrs:ingredients

   }
   this.Ms.addProduct(prod)
   this.router.navigateByUrl("/menu")

  }

}
