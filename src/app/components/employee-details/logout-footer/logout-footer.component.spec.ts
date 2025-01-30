import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutFooterComponent } from './logout-footer.component';

describe('LogoutFooterComponent', () => {
  let component: LogoutFooterComponent;
  let fixture: ComponentFixture<LogoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
