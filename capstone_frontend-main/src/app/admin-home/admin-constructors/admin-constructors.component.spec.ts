import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConstructorsComponent } from './admin-constructors.component';

describe('AdminConstructorsComponent', () => {
  let component: AdminConstructorsComponent;
  let fixture: ComponentFixture<AdminConstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConstructorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
