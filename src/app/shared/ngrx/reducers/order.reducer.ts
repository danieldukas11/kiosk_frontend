import { createReducer, on } from '@ngrx/store';
import { updateOrder } from '../actions/order.action';
export const initialState = [];

const orderReducer = createReducer(initialState,
  on(updateOrder, (state, {order} ) => order)
);
export function OrderReducer(state, action) {
  return orderReducer(state, action);
}
