import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
//import { IngredientsComponent } from './ingredients/ingredients.component';
import {HttpClientModule} from '@angular/common/http';
import { ComboMenuComponent } from './components/combo-menu/combo-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component';
import { ProductCustomizeComponent } from './components/product-customize/product-customize.component';
import { ComboCustomizeComponent } from './components/combo-customize/combo-customize.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProductsComponent,
    //IngredientsComponent,
    ComboMenuComponent,
    ProductDetailsComponent,
    MenuDetailComponent,
    ProductCustomizeComponent,
    ComboCustomizeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
