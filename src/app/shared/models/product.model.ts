import { Ingredient } from './ingredient.model';
import { IngredientType } from './ingredient-type.model';

export interface Product{
    _id:number;
    title:string;    
    price:number;    
    image:string;
    ingredients:Ingredient[];
    defaults:IngredientType[]
}