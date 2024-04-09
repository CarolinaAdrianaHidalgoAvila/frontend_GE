import { Component, OnInit } from '@angular/core';
import { RutaService } from '../ruta.service';
import { ActivatedRoute } from '@angular/router';
import { Detalle } from '../detalle';
import { Frecuencia } from '../frecuencia';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'; 
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
  detalleRuta: Detalle = {
    id: 0,
    codigo_vehiculo: '',
    nombre_ruta: '',
    distrito: '',
    hora_inicio: '',
    hora_fin: '',
    peso: 0,
    distancia: 0,
    observacion: '',
    fecha_modificacion: new Date(),
    idRuta: 0
  };
  frecuencias: Frecuencia[] = []; 
  idRuta = Number(this.route.snapshot.paramMap.get('idRuta'));
  idKmlRuta = Number(this.route.snapshot.paramMap.get('idKmlRuta'));
  detalleForm: FormGroup;
  frecuenciaForm: FormGroup;
  constructor(
    private rutaService: RutaService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.frecuenciaForm = this.formBuilder.group({});
      this.detalleForm = this.formBuilder.group({
        codigo_vehiculo: [''],
        nombre_ruta: [''],
        distrito: [''],
        hora_inicio: [''],
        hora_fin: [''],
        peso: [0],
        distancia: [0],
        observacion: [''],
        fecha_modificacion: ['']
  
      });

      // Escuchar los cambios en el formulario
      this.detalleForm.valueChanges.subscribe(() => {
        this.actualizarDetalle();
      });
    }
  ngOnInit(): void {
    // Llama al servicio para obtener los datos del detalle de la ruta
    this.obtenerDetalle(this.idRuta);
  }
  obtenerDetalle(id: number) {
    this.rutaService.getDetalle(id).subscribe(
      (data: Detalle) => {
        // Al recibir la respuesta exitosa del servicio, asigna los datos al objeto detalleRuta
        this.detalleRuta = data;
        this.detalleForm.patchValue(data);
        this.obtenerFrecuencias(this.detalleRuta.id);

    // Configura el formulario de frecuencias con casillas de verificación
      this.frecuencias.forEach((frecuencia) => {
      this.frecuenciaForm.addControl(frecuencia.dia, new FormControl(frecuencia.estado));
    });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerFrecuencias(idDetalle: number): void {
    this.rutaService.getDetalleFrecuencia(idDetalle).subscribe(
      (data: Frecuencia[]) => {
        this.frecuencias = data;
        this.frecuencias = this.frecuencias.sort((a, b) => {
          const diasOrdenados = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
          return diasOrdenados.indexOf(a.dia) - diasOrdenados.indexOf(b.dia);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  actualizarDetalle() {
    const idRuta = this.idRuta; 
    const idDetalle = this.detalleRuta.id; // ID del detalle de la ruta actual
    const detalleActualizado = this.detalleForm.value;
    this.rutaService.updateDetalle(idRuta, idDetalle, detalleActualizado).subscribe(
      (data: Detalle) => {
        console.log('Detalle actualizado:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  actualizarFrecuencias() {
    const idDetalle = this.detalleRuta.id;
    this.rutaService.updateDetalleFrecuencia(idDetalle, this.frecuencias).subscribe(
      (data: Frecuencia[]) => {
        console.log('Frecuencias actualizadas:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onCheckboxChange(frecuencia: Frecuencia) {
    this.actualizarFrecuencias();
  }
}
