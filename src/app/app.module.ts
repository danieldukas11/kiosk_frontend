import { BrowserModule } from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import {HttpClientModule} from '@angular/common/http';
import { ComboMenuComponent } from './components/combo-menu/combo-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component';
import { ProductCustomizeComponent } from './components/product-customize/product-customize.component';
import { ComboCustomizeComponent } from './components/combo-customize/combo-customize.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TipComponent } from './components/payment/tip/tip.component';
import { SelectPayComponent } from './components/payment/select-pay/select-pay.component';
import { CashPayComponent } from './components/payment/cash-pay/cash-pay.component';
import { CardPayComponent } from './components/payment/card-pay/card-pay.component';
import { CashPayFinishComponent } from './components/payment/cash-pay-finish/cash-pay-finish.component';
import { PaymentFinishComponent } from './components/payment/payment-finish/payment-finish.component';
import {ToasterModule} from 'angular2-toaster';
import { LoginComponent } from './login/login.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
const config: SocketIoConfig = { url: `${environment.staticUrl}`, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProductsComponent,
    ComboMenuComponent,
    ProductDetailsComponent,
    MenuDetailComponent,
    ProductCustomizeComponent,
    ComboCustomizeComponent,
    PaymentComponent,
    TipComponent,
    SelectPayComponent,
    CashPayComponent,
    CardPayComponent,
    CashPayFinishComponent,
    PaymentFinishComponent,
    LoginComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ToasterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
