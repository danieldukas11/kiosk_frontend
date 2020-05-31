import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { KioskService } from '../../services/kiosk.service';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {loadKiosk, updateKiosk} from '../actions/kiosk.action';


@Injectable()
export class KioskEffects {

  loadMenu$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadKiosk),
    mergeMap(() => this.kioskService.getKioskData()
      .pipe(
        map((data: any) => {return updateKiosk({data});
        }),
        catchError(() => EMPTY)
      )
    )
  )
);

  constructor(private actions$: Actions,
              private kioskService: KioskService) {}

}
