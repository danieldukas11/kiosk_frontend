import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveRefundComponent } from './give-refund.component';

describe('GiveRefundComponent', () => {
  let component: GiveRefundComponent;
  let fixture: ComponentFixture<GiveRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
