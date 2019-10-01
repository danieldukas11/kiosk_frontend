import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
//import { IngredientsComponent } from './ingredients/ingredients.component';


const routes: Routes = [
  {
    path:"",
    component: HomeComponent 
  },
  {
    path:"menu",
    component:MenuComponent,
    children:[
      {
        path:"**",
        component:ProductsComponent
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
