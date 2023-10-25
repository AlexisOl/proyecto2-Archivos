import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionArchivoComponent } from './creacion-archivo.component';

describe('CreacionArchivoComponent', () => {
  let component: CreacionArchivoComponent;
  let fixture: ComponentFixture<CreacionArchivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionArchivoComponent]
    });
    fixture = TestBed.createComponent(CreacionArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
