import { TestBed } from '@angular/core/testing';

import { UbicacionServicioService } from './ubicacion-servicio.service';

describe('UbicacionServicioService', () => {
  let service: UbicacionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
