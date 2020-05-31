import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPayComponent } from './cash-pay.component';

describe('CashPayComponent', () => {
  let component: CashPayComponent;
  let fixture: ComponentFixture<CashPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
