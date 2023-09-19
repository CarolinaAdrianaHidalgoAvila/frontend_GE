import { TestBed, inject,ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IndexComponent } from './index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ComponentesModule } from '../../componentes/componentes.module';
describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [RouterTestingModule, HttpClientTestingModule,ComponentesModule], // Importa HttpClientTestingModule
      providers: [HttpClient], // Proporciona HttpClient
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the section title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain('Tutoriales');
  });

  it('should have a "CARGAR NUEVO" button with the correct routerLink', () => {
    const cargarNuevoButton = fixture.debugElement.query(By.css('a.btn-success'));
    expect(cargarNuevoButton.nativeElement.textContent).toContain('CARGAR NUEVO');
    expect(cargarNuevoButton.nativeElement.getAttribute('routerLink')).toBe('/videos/create');
  });
});