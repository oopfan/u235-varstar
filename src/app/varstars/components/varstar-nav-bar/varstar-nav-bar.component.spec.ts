import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarNavBarComponent } from './varstar-nav-bar.component';

describe('VarStarNavBarComponent', () => {
  let component: VarStarNavBarComponent;
  let fixture: ComponentFixture<VarStarNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
