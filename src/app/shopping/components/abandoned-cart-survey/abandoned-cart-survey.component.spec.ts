import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonedCartSurveyComponent } from './abandoned-cart-survey.component';

describe('AbandonedCartSurveyComponent', () => {
  let component: AbandonedCartSurveyComponent;
  let fixture: ComponentFixture<AbandonedCartSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonedCartSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonedCartSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
