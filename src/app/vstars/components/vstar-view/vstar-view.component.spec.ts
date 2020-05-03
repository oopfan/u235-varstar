import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstarViewComponent } from './vstar-view.component';

describe('VstarViewComponent', () => {
  let component: VstarViewComponent;
  let fixture: ComponentFixture<VstarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
