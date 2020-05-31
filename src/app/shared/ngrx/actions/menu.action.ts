import { createAction, props} from '@ngrx/store';

export const loadMenu = createAction('[menu product] load' );
export const updateMenu = createAction('[menu product] update', props<{menu: any[]}>());
