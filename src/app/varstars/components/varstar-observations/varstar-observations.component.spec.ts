import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarObservationsComponent } from './varstar-observations.component';

describe('VarStarObservationsComponent', () => {
  let component: VarStarObservationsComponent;
  let fixture: ComponentFixture<VarStarObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
