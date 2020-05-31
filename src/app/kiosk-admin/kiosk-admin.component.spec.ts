import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskAdminComponent } from './kiosk-admin.component';

describe('KioskAdminComponent', () => {
  let component: KioskAdminComponent;
  let fixture: ComponentFixture<KioskAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
