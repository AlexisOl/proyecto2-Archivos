import { TestBed } from '@angular/core/testing';

import { EmpleadosServicioService } from './empleados-servicio.service';

describe('EmpleadosServicioService', () => {
  let service: EmpleadosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
