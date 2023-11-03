import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeterminacionUbicacionComponent } from './determinacion-ubicacion.component';

describe('DeterminacionUbicacionComponent', () => {
  let component: DeterminacionUbicacionComponent;
  let fixture: ComponentFixture<DeterminacionUbicacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeterminacionUbicacionComponent]
    });
    fixture = TestBed.createComponent(DeterminacionUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
