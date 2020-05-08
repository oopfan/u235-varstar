import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorSuggestionComponent } from './http-error-suggestion.component';

describe('HttpErrorSuggestionComponent', () => {
  let component: HttpErrorSuggestionComponent;
  let fixture: ComponentFixture<HttpErrorSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpErrorSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
