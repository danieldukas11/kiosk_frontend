import { TestBed } from '@angular/core/testing';

import { PinAuthGuard } from './pin-auth.guard';

describe('PinAuthGuard', () => {
  let guard: PinAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PinAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
