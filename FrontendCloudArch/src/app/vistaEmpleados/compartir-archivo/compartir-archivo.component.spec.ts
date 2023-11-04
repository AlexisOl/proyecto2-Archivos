import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirArchivoComponent } from './compartir-archivo.component';

describe('CompartirArchivoComponent', () => {
  let component: CompartirArchivoComponent;
  let fixture: ComponentFixture<CompartirArchivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompartirArchivoComponent]
    });
    fixture = TestBed.createComponent(CompartirArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
