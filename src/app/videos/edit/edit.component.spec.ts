import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit.component';
import { Tutorial } from '../tutorial';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule],
      providers: [HttpClient]
    });
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;

    // Configura el objeto tutorial aquí, dentro de beforeEach
    const tutorial: Tutorial = {
      id: 1,
      titulo: 'Título válido',
      url_contenido: 'https://ejemplo.com/video.mp4',
      fecha_carga: new Date(),
      fecha_modificacion: new Date(),
    };
    component.tutorial = tutorial;
  });
  
  it('should display no error message for valid title', () => {
    // Establece un título válido en el componente
    component.tutorial = { id: 1,titulo: 'Título válido', url_contenido: 'https://ejemplo.com/video.mp4',fecha_carga: new Date(), fecha_modificacion: new Date(), };

    // Activa la detección de cambios de Angular
    fixture.detectChanges();

    // Obtiene el elemento HTML del título y verifica que no contenga el mensaje de error
    const tituloInput = fixture.nativeElement.querySelector('#titulo');
    expect(tituloInput.classList).not.toContain('ng-invalid');

    const errorMessage = fixture.nativeElement.querySelector('.alert.alert-danger');
    expect(errorMessage).toBeNull();
  });
});
