import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import {PaymentComponent} from './payment/payment.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {PinComponent} from './pin/pin.component';
import {KioskAdminComponent} from './kiosk-admin/kiosk-admin.component';
import {PinAuthGuard} from './shared/guards/pin-auth.guard';
import {AdminHomeComponent} from './kiosk-admin/admin-home/admin-home.component'
import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path : 'signin',
    component: LoginComponent
  },
  {
    path: 'pin',
    component: PinComponent,
    canActivate: [AuthGuard],
  },
  {
    path : 'kioskadmin',
    loadChildren: () => import('./kiosk-admin/kiosk-admin.module').then(m => m.KioskAdminModule),
    component : KioskAdminComponent,
    canActivate : [AuthGuard, PinAuthGuard],
    // children: [
    //   {
    //     path: '',
    //     component: AdminHomeComponent
    //   }
    // ]
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: 'start',
            component: PaymentComponent,
            outlet: 'payment'
          },
        ]
      },
      {
        path: ':id/ingredients',
        component: IngredientsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
