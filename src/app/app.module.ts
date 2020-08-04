import {BrowserModule} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {ProductsComponent} from './products/products.component';
import {HttpClientModule} from '@angular/common/http';
import {PaymentComponent} from './payment/payment.component';
import {TipComponent} from './payment/tip/tip.component';
import {SelectPayComponent} from './payment/select-pay/select-pay.component';
import {CashPayComponent} from './payment/cash-pay/cash-pay.component';
import {CardPayComponent} from './payment/card-pay/card-pay.component';
import {CashPayFinishComponent} from './payment/cash-pay-finish/cash-pay-finish.component';
import {PaymentFinishComponent} from './payment/payment-finish/payment-finish.component';
import {ToasterModule} from 'angular2-toaster';
import {LoginComponent} from './login/login.component';
import {ClickStopPropagationDirective} from './directives/click-stop-propagation.directive';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {StoreModule} from '@ngrx/store';
import {OrderReducer} from './shared/ngrx/reducers/order.reducer';
import {MenuReducer} from './shared/ngrx/reducers/menu.reducer';
import {KioskReducer} from './shared/ngrx/reducers/kiosk.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MenuEffects} from './shared/ngrx/effects/menu.effects';
import {KioskEffects} from './shared/ngrx/effects/kiosk.effects';
import {PhoneComponent} from './payment/phone/phone.component';
import {SpecialInstructionsComponent} from './payment/special-instructions/special-instructions.component';
import {AlergyInfoComponent} from './payment/alergy-info/alergy-info.component';
import {DestructComponent} from './destruct/destruct.component';
import {LogoutButtonComponent} from './logout-button/logout-button.component';
import {PinComponent} from './pin/pin.component';
import {KioskAdminComponent} from './kiosk-admin/kiosk-admin.component';
import {AdminHomeComponent} from './kiosk-admin/admin-home/admin-home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignaturePadModule} from 'ngx-signaturepad';

const config: SocketIoConfig = {
    url: environment.socketUrl, options: {
        query: `ns=5e006191363b1b1dd14e4f49`,
        resource: 'solo'
    }
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        ProductsComponent,
        PaymentComponent,
        TipComponent,
        SelectPayComponent,
        CashPayComponent,
        CardPayComponent,
        CashPayFinishComponent,
        PaymentFinishComponent,
        LoginComponent,
        ClickStopPropagationDirective,
        IngredientsComponent,
        PhoneComponent,
        SpecialInstructionsComponent,
        AlergyInfoComponent,
        DestructComponent,
        LogoutButtonComponent,
        PinComponent,
        KioskAdminComponent,
        AdminHomeComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        SignaturePadModule,
        FormsModule,
        ToasterModule.forRoot(),
        StoreModule.forRoot({orders: OrderReducer, menu: MenuReducer, kiosk: KioskReducer}),
        EffectsModule.forRoot([MenuEffects, KioskEffects]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
