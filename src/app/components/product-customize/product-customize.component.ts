import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { RoutingService } from '../../shared/services/routing.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-product-customize',
  templateUrl: './product-customize.component.html',
  styleUrls: ['./product-customize.component.scss']
})
export class ProductCustomizeComponent implements OnInit, OnDestroy {
  product;
  openTypeId = '';
  ref;
  route;
  special = false;
  type;
  Subscriptions = [];
  ingridientTypes = [];
  public imgUrl = environment.staticUrl + 'images/';

  constructor(
    private ms: MenuService,
    private rs: RoutingService
  ) { }



  ngOnInit() {
    this.route = this.rs.$route.subscribe(route => {
      if (route === 'customize' ) {
        this.Subscriptions.push(
          this.ms.product.subscribe((dat: any) => {
            this.type = dat.type;
            dat.product.ingredients.forEach((ingr: any) => {
              ingr.ingridientTypes = [];
              ingr.defaults.forEach(d => {
                ingr.ingridientTypes.push(d);
                d.selected = true;
                d.selected_qty = '';
              });
              ingr.optionals.forEach(d => {
                ingr.ingridientTypes.push(d);
                d.selected = false;
                d.selected_qty = '';
              });
            });
            this.product = dat.product;
            // console.log(this.product);
          }),
        );
      } else if (route === 'customize-combo-prod') {
        this.special = true;
        this.Subscriptions.push(
          this.ms.comboPrord.subscribe((dat: any) => {
           this.type = dat.type;
           this.ref = dat.ref ;
           dat.product.ingredients.forEach(ingr => {
                ingr.types.forEach(type => {
                  dat.product.defaults.forEach(def => {
                    if (def._id === type._id) {
                      type.selected = true;
                    }
                  });
                });
                const sel = [];
                ingr.types = ingr.types.filter(type => {
                  if (type.selected) {
                    sel.push(type);
                  }
                  return !type.selected;
                });
                ingr.types = sel.concat(ingr.types);
              });
           this.product = dat.product;
          }),
        );
      }
    });
  }
  ngOnDestroy() {
    this.Subscriptions.forEach(s => s.unsubscribe());
    this.route.unsubscribe();
  }


  openTypeSelecting(id) {
    this.openTypeId = id;
  }
  addProduct(qty, type, ingredient, ti) {
    type.selected = true;
    type.selected_qty = qty;
    ingredient.ingredientTypes = ingredient.ingridientTypes.splice(ti, 1, );
    ingredient.ingridientTypes.unshift(type);
    this.openTypeId = '';
    console.log(ingredient.ingredientTypes);
  }
  checkDefault(id, ingredient) {
    let includes = false;
    for (const i of ingredient.defaults) {
      if (i._id === id) {
        includes = true;
        break;
      }
    }
    return includes;
  }
  checktype(data) {
    return  data  === null;
  }

  deleteItem(type, ingr, ti) {
    type.selected = false;
    ingr.ingredientTypes = ingr.ingridientTypes.splice(ti, 1, );
    ingr.ingridientTypes.push(type);
    type.selected_qty = '';
    this.openTypeId = '';
    console.log(type);
  }

  /*deleteItem(id,ii,ti){
    this.product.defaults=this.product.defaults.filter(deflt=>{
      return deflt._id!=id
    })
    delete this.product.ingredients[ii].types[ti].selected;
    let tp=this.product.ingredients[ii].types[ti];
    this.product.price=(this.product.price*1000-tp.price*1000)/1000;
    tp.price=tp.normal_price;
    this.product.ingredients[ii].types.splice(ti,1);
    this.product.ingredients[ii].types.push(tp);
    this.openTypeId="";
    if (!this.special){
      this.ms.addForPay({prod:this.product,action:"update",special:this.special})
    }
    else{
      this.ms.addForPay({prod:this.ref,action:"update",special:this.special})
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
    if (!this.special){
      this.ms.addForPay({prod:this.product,action:"update",special:this.special})
    }
    else{
      let pr=JSON.parse(JSON.stringify(this.ref))
      pr.price=0
      pr.menus.forEach((menu)=>{
        pr.price=(pr.price*1000+menu.default[0].price*1000)/1000
      })
      this.ms.addForPay({prod:pr,action:"update",special:this.special})
    }

  }*/

}
