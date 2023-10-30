import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEspecificaArchivosComponent } from './vista-especifica-archivos.component';

describe('VistaEspecificaArchivosComponent', () => {
  let component: VistaEspecificaArchivosComponent;
  let fixture: ComponentFixture<VistaEspecificaArchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaEspecificaArchivosComponent]
    });
    fixture = TestBed.createComponent(VistaEspecificaArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
