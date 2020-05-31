import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPayFinishComponent } from './cash-pay-finish.component';

describe('CashPayFinishComponent', () => {
  let component: CashPayFinishComponent;
  let fixture: ComponentFixture<CashPayFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPayFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashPayFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
