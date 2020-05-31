import { TestBed } from '@angular/core/testing';
import 'jasmine';
import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutingService = TestBed.inject(RoutingService);
    expect(service).toBeTruthy();
  });
});
