import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstarOverviewComponent } from './vstar-overview.component';

describe('VstarOverviewComponent', () => {
  let component: VstarOverviewComponent;
  let fixture: ComponentFixture<VstarOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstarOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstarOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
