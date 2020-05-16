import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarStarGalleryComponent } from './varstar-gallery.component';

describe('VarStarGalleryComponent', () => {
  let component: VarStarGalleryComponent;
  let fixture: ComponentFixture<VarStarGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarStarGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarStarGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
