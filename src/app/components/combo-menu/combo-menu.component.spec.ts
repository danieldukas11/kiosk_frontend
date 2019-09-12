import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboMenuComponent } from './combo-menu.component';

describe('ComboMenuComponent', () => {
  let component: ComboMenuComponent;
  let fixture: ComponentFixture<ComboMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
