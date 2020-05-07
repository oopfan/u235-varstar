import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarLightCurveComponent } from './varstar-light-curve.component';

describe('VarStarLightCurveComponent', () => {
  let component: VarStarLightCurveComponent;
  let fixture: ComponentFixture<VarStarLightCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarLightCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarLightCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
