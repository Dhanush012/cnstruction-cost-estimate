import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorHomeComponent } from './constructor-home.component';

describe('ConstructorHomeComponent', () => {
  let component: ConstructorHomeComponent;
  let fixture: ComponentFixture<ConstructorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
