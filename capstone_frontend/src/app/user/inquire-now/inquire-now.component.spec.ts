import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquireNowComponent } from './inquire-now.component';

describe('InquireNowComponent', () => {
  let component: InquireNowComponent;
  let fixture: ComponentFixture<InquireNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquireNowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquireNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
