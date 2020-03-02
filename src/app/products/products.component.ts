import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../shared/services/routing.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(
    public rs: RoutingService,
  ) { }
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  /*getProduct(product){
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
  }*/

}
