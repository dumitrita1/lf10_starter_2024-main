import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQualificationsComponent } from './new-qualifications.component';

describe('NewQualificationsComponent', () => {
  let component: NewQualificationsComponent;
  let fixture: ComponentFixture<NewQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewQualificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
