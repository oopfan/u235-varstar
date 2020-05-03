import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstarsHomeComponent } from './vstars-home.component';

describe('VstarsHomeComponent', () => {
  let component: VstarsHomeComponent;
  let fixture: ComponentFixture<VstarsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstarsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstarsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
