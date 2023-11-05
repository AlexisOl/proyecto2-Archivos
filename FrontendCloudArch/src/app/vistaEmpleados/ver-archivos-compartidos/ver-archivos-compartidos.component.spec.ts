import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArchivosCompartidosComponent } from './ver-archivos-compartidos.component';

describe('VerArchivosCompartidosComponent', () => {
  let component: VerArchivosCompartidosComponent;
  let fixture: ComponentFixture<VerArchivosCompartidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerArchivosCompartidosComponent]
    });
    fixture = TestBed.createComponent(VerArchivosCompartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
