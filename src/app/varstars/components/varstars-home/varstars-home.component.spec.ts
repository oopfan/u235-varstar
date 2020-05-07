import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarsHomeComponent } from './varstars-home.component';

describe('VarStarsHomeComponent', () => {
  let component: VarStarsHomeComponent;
  let fixture: ComponentFixture<VarStarsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
