import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstarLightCurveComponent } from './vstar-light-curve.component';

describe('VstarLightCurveComponent', () => {
  let component: VstarLightCurveComponent;
  let fixture: ComponentFixture<VstarLightCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstarLightCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstarLightCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
