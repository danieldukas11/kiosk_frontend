import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlergyInfoComponent } from './alergy-info.component';

describe('AlergyInfoComponent', () => {
  let component: AlergyInfoComponent;
  let fixture: ComponentFixture<AlergyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlergyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlergyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
