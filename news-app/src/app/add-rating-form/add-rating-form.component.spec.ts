import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingFormComponent } from './add-rating-form.component';

describe('AddRatingFormComponent', () => {
  let component: AddRatingFormComponent;
  let fixture: ComponentFixture<AddRatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRatingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
