import { TestBed, inject,ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TutorialService } from './tutorial.service';
import { Tutorial } from './tutorial';

describe('TutorialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    });
  });
  it('should be created', inject([TutorialService], (service: TutorialService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve a tutorial by id', inject([TutorialService, HttpTestingController], (service: TutorialService, httpMock: HttpTestingController) => {
    const mockTutorial: Tutorial = {
      id: 1,
      titulo: 'Tutorial 1',
      url_contenido: 'url1.mp4',
      fecha_carga: new Date(),
      fecha_modificacion: new Date()
    };

    service.find(1).subscribe((tutorial) => {
      expect(tutorial).toEqual(mockTutorial);
    });

    const req = httpMock.expectOne(`${service['apiURL']}1`); // 'service['apiURL']' es la URL privada del servicio
    expect(req.request.method).toBe('GET');

    req.flush(mockTutorial);

    httpMock.verify();
  }));

  it('should create a new tutorial', inject([TutorialService, HttpTestingController], (service: TutorialService, httpMock: HttpTestingController) => {
    const newTutorial: Tutorial = {
      id: 2,
      titulo: 'Nuevo Tutorial',
      url_contenido: 'nuevo.mp4',
      fecha_carga: new Date(),
      fecha_modificacion: new Date()
    };

    service.create(newTutorial).subscribe((tutorial) => {
      expect(tutorial).toEqual(newTutorial);
    });

    const req = httpMock.expectOne(service['apiURL']); // 'service['apiURL']' es la URL privada del servicio
    expect(req.request.method).toBe('POST');

    req.flush(newTutorial);

    httpMock.verify();
  }));

  it('should update an existing tutorial', inject([TutorialService, HttpTestingController], (service: TutorialService, httpMock: HttpTestingController) => {
    const updatedTutorial: Tutorial = {
      id: 1,
      titulo: 'Tutorial Actualizado',
      url_contenido: 'url_actualizado.mp4',
      fecha_carga: new Date(),
      fecha_modificacion: new Date()
    };

    service.update(1, updatedTutorial).subscribe((tutorial) => {
      expect(tutorial).toEqual(updatedTutorial);
    });

    const req = httpMock.expectOne(`${service['apiURL']}1`); // 'service['apiURL']' es la URL privada del servicio
    expect(req.request.method).toBe('PUT');

    req.flush(updatedTutorial);

    httpMock.verify();
  }));

  it('should delete a tutorial', inject([TutorialService, HttpTestingController], (service: TutorialService, httpMock: HttpTestingController) => {
    service.delete(1).subscribe(() => {
      // Comprobar que se ha realizado la eliminación correctamente
    });

    const req = httpMock.expectOne(`${service['apiURL']}1`); // 'service['apiURL']' es la URL privada del servicio
    expect(req.request.method).toBe('DELETE');

    req.flush({}); // Puedes devolver un objeto vacío o cualquier otro valor

    httpMock.verify();
  }));
});

