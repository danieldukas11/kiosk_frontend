import { IngredientType } from './ingredient-type.model';

export interface Ingredient{
    _id:number;
    title:string;
    ingredient_types:IngredientType[]
    
}