import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCustomizeComponent } from './combo-customize.component';

describe('ComboCustomizeComponent', () => {
  let component: ComboCustomizeComponent;
  let fixture: ComponentFixture<ComboCustomizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboCustomizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
