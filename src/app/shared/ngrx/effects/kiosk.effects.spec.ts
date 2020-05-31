import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { KioskEffects } from './kiosk.effects';

describe('KioskEffects', () => {
  let actions$: Observable<any>;
  let effects: KioskEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KioskEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<KioskEffects>(KioskEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
