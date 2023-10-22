import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEmpleadoComponent } from './general-empleado.component';

describe('GeneralEmpleadoComponent', () => {
  let component: GeneralEmpleadoComponent;
  let fixture: ComponentFixture<GeneralEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralEmpleadoComponent]
    });
    fixture = TestBed.createComponent(GeneralEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
