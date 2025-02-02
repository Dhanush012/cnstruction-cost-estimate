import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorRegisterComponent } from './constructor-register.component';

describe('ConstructorRegisterComponent', () => {
  let component: ConstructorRegisterComponent;
  let fixture: ComponentFixture<ConstructorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
