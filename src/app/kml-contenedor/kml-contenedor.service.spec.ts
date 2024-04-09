import { TestBed } from '@angular/core/testing';

import { KmlContenedorService } from './kml-contenedor.service';

describe('KmlContenedorService', () => {
  let service: KmlContenedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmlContenedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
