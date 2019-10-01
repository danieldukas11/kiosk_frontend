import { Component, OnInit,OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-customize',
  templateUrl: './product-customize.component.html',
  styleUrls: ['./product-customize.component.scss']
})
export class ProductCustomizeComponent implements OnInit,OnDestroy {
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
          dat.product.ingredients.forEach(ingr => {
            ingr.types.forEach(type=>{
              dat.product.defaults.forEach(def=>{
                if(def._id==type._id){
                  type.selected=true
                }
              })
            })
            let sel=[]
            ingr.types=ingr.types.filter(type=>{
              if(type.selected){
                sel.push(type)
              }
              return !type.selected
            })
            ingr.types=sel.concat(ingr.types)
          }) 
        
        this.product=dat.product       
           
      }),
    )
  }
  ngOnDestroy(){
    this.Subscriptions.forEach(s=>s.unsubscribe())
  }


  openTypeSelecting(id){
    this.openTypeId=id
  }

  deleteItem(id,ii,ti){
    this.product.defaults=this.product.defaults.filter(deflt=>{      
      return deflt._id!=id
    })    
    delete this.product.ingredients[ii].types[ti].selected;
    let tp=this.product.ingredients[ii].types[ti];
    this.product.price=(this.product.price*1000-tp.price*1000)/1000;
    tp.price=tp.normal_price;
    this.product.ingredients[ii].types.splice(ti,1);
    this.product.ingredients[ii].types.push(tp)  ;  
    this.openTypeId="";
  }

  addProduct(qty,type,ingredient){
    if(ingredient&&ingredient.multiSelect)  {            
      this.addProd(qty,type,ingredient)
    }
    else{
      let id=ingredient.types[0]._id;
      this.product.defaults=this.product.defaults.filter(def=>{
        return def._id!=id
      })
      delete ingredient.types[0].selected;
      ingredient.types[0].price=ingredient.types[0].normal_price;      
      ingredient.types.push(ingredient.types[0]);
      ingredient.types.splice(0,1);
      this.addProd(qty,type,ingredient);
    }
    
  
  }
  addProd(qty,type,ingredient){
    let defaultSelected=this.product.defaults.find(data=>{      
      return data._id==type._id
    })
    
    switch(qty){
      case "normal":
        type.selected=true
        type.price=type.normal_price
        delete type.selected_qty
        break;
      case "light":
          type.selected=true
          type.price=type.light_price
          type.selected_qty=0.5
        break;
      case "double":
          type.selected=true
          type.price=type.double_price
          type.selected_qty=2
        break;
        default:
          break

    }
    ingredient.types=ingredient.types.filter(t=>{
      return t._id!=type._id
    })
    ingredient.types.unshift(type)
    if (!defaultSelected){
      this.product.defaults.unshift(type)
    }    
    else{
      defaultSelected.selected_qty=type.selected_qty
      defaultSelected.price=type.price
    }
    this.product.price=this.product.defaults.reduce((curr,next)=>{
      return (curr*1000+next.price*1000)/1000
    },0)

    this.openTypeId=""
  }

}
