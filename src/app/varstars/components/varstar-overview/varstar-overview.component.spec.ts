import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarOverviewComponent } from './varstar-overview.component';

describe('VarStarOverviewComponent', () => {
  let component: VarStarOverviewComponent;
  let fixture: ComponentFixture<VarStarOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
