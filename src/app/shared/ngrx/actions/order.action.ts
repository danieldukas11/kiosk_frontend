import { createAction, props } from '@ngrx/store';

export const updateOrder = createAction(
    '[order product] update', props<{order: any[]}>()
    );
