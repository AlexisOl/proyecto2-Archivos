import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionCarpetaComponent } from './creacion-carpeta.component';

describe('CreacionCarpetaComponent', () => {
  let component: CreacionCarpetaComponent;
  let fixture: ComponentFixture<CreacionCarpetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionCarpetaComponent]
    });
    fixture = TestBed.createComponent(CreacionCarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
