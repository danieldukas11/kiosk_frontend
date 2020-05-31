import { createReducer, on } from '@ngrx/store';
import { updateMenu } from '../actions/menu.action';
export const initialState = [];

const menuReducer = createReducer(initialState,
  on(updateMenu, (state, {menu} ) => menu)
);
export function MenuReducer(state, action) {
  return menuReducer(state, action);
}
