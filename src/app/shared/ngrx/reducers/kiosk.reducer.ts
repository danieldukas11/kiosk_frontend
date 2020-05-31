import { createReducer, on } from '@ngrx/store';
import { updateKiosk } from '../actions/kiosk.action';
export const initialState = [];

const kioskReducer = createReducer(initialState,
  on(updateKiosk, (state, {data} ) => data)
);
export function KioskReducer(state, action) {
  return kioskReducer(state, action);
}
