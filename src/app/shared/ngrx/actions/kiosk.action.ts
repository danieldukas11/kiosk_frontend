import { createAction, props} from '@ngrx/store';

export const loadKiosk = createAction('[kiosk data] load' );
export const updateKiosk = createAction('[kiosk data] update', props<{data: any}>());
