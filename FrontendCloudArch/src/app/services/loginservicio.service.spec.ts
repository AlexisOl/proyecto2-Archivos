import { TestBed } from '@angular/core/testing';

import { LoginservicioService } from './loginservicio.service';

describe('LoginservicioService', () => {
  let service: LoginservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
