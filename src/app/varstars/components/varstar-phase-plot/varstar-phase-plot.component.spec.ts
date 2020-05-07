import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarPhasePlotComponent } from './varstar-phase-plot.component';

describe('VarStarPhasePlotComponent', () => {
  let component: VarStarPhasePlotComponent;
  let fixture: ComponentFixture<VarStarPhasePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarPhasePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarPhasePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
