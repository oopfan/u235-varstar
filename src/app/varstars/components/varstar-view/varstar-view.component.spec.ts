import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarViewComponent } from './varstar-view.component';

describe('VarStarViewComponent', () => {
  let component: VarStarViewComponent;
  let fixture: ComponentFixture<VarStarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
