import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MenuService } from '../../services/menu.service';
import {loadMenu, updateMenu} from '../actions/menu.action';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class MenuEffects {

  loadMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenu),
      mergeMap(() => this.menuService.getMenu()
        .pipe(
          map((menu: any[]) => {
            menu.forEach((c) => {
              c.products.forEach(p => {
                if (p.sizable && p.sizes && p.sizes.length && !p.customizable) {
                  p.sizes.forEach((s) => {
                    s.qty = 0;
                  });
                } else if (p.sizable && p.sizes && p.sizes.length && p.customizable) {
                  p.sizes.forEach((s) => {
                    s.qty = 0;
                    s.default_price = s.price;
                  });
                  p.ingredients.forEach((ingr) => {
                    ingr.defaults.forEach((d) => {
                      d.light_price = 0;
                      d.price = 0;
                    });
                  });
                }
              });
            });
            return updateMenu({menu});
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}
