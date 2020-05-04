import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstarObservationsComponent } from './vstar-observations.component';

describe('VstarObservationsComponent', () => {
  let component: VstarObservationsComponent;
  let fixture: ComponentFixture<VstarObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstarObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstarObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
