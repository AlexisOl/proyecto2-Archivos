import { TestBed } from '@angular/core/testing';

import { UbicacionPapeleraService } from './ubicacion-papelera.service';

describe('UbicacionPapeleraService', () => {
  let service: UbicacionPapeleraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionPapeleraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
