import { TestBed } from '@angular/core/testing';

import { KmlRutaService } from './kml-ruta.service';

describe('KmlRutaService', () => {
  let service: KmlRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmlRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
