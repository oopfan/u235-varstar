import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstarPhasePlotComponent } from './vstar-phase-plot.component';

describe('VstarPhasePlotComponent', () => {
  let component: VstarPhasePlotComponent;
  let fixture: ComponentFixture<VstarPhasePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstarPhasePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstarPhasePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
