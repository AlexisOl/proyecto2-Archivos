import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosCompartidosComponent } from './archivos-compartidos.component';

describe('ArchivosCompartidosComponent', () => {
  let component: ArchivosCompartidosComponent;
  let fixture: ComponentFixture<ArchivosCompartidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosCompartidosComponent]
    });
    fixture = TestBed.createComponent(ArchivosCompartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
