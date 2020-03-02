import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { RoutingService } from '../../shared/services/routing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-combo-customize',
  templateUrl: './combo-customize.component.html',
  styleUrls: ['./combo-customize.component.scss']
})
export class ComboCustomizeComponent implements OnInit, OnDestroy {
  product;
  SizeProd;
  openTypeId: any = -1;
  type;
  Subscriptions = [];
  public imgUrl = environment.staticUrl + 'images/';

  constructor(
    private ms: MenuService,
    private rs: RoutingService
  ) { }

  ngOnInit() {

    this.Subscriptions.push(
      this.ms.product.subscribe((dat: any) => {
        this.type = dat.type;
        this.product = dat.product;
        this.product.menus.forEach(menu => {
          menu.products.forEach(prod => {
            if (prod._id === menu.default[0]._id) {
              prod.price = menu.default[0].price;
            }
          });
        });
      }),
    );
  }
  ngOnDestroy() {
    this.Subscriptions.forEach(s => s.unsubscribe());
  }


  getSelected(id, selectedId) {
      if (selectedId === id) {
        return 'selected';
      }
      return '';
  }

  customize(prod) {
    const data = {
      type: 'prod-customize',
      product: prod,
      ref: this.product
    };
    this.ms.comboProdCustomize(data)
    this.rs.setRoute('customize-combo-prod')
  }
  continue(mi, prod) {
    if (prod.sizable) {
      this.product.menus[mi].default[0] = prod;
      this.SizeProd = prod;
      this.openTypeId = mi;
    }
  }
  getSizeSelected(size) {
    return size.title === this.SizeProd.size.title ? 'selected' : '';
  }
  getSize(size) {
    this.SizeProd.size = size;
    this.SizeProd.price = size.price;
    this.product.price = 0;
    this.product.menus.forEach(menu => {
    this.product.price = this.product.price + menu.default[0].price;
    });
    this.openTypeId = -1;
    this.ms.addForPay({prod: this.product, action: 'update', special: true});
  }
}