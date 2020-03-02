import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPayComponent } from './select-pay.component';

describe('SelectPayComponent', () => {
  let component: SelectPayComponent;
  let fixture: ComponentFixture<SelectPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
