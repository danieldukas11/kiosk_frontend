import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomizeComponent } from './product-customize.component';

describe('ProductCustomizeComponent', () => {
  let component: ProductCustomizeComponent;
  let fixture: ComponentFixture<ProductCustomizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCustomizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
