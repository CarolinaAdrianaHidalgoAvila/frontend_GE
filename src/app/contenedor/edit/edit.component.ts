import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { ContenedorService } from '../contenedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Contenedor } from '../contenedor';
import { Map, latLng, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  idKmlContenedor:number =0;
  contenedor!: Contenedor;
  form!: FormGroup;

  constructor(
    public contenedorService: ContenedorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    const fechaActual = new Date();
    this.id = this.route.snapshot.params['idContenedor'];
    this.idKmlContenedor = this.route.snapshot.params['idKmlContenedor'];
    this.contenedorService.find(this.idKmlContenedor, this.id).subscribe(
      (data: Contenedor) => {
          this.contenedor = data;
          const map = new Map('map').setView([this.contenedor.latitud, this.contenedor.longitud], 13);
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);
    // Agrega un marcador al mapa
    const contenedorMarker = marker([this.contenedor.latitud, this.contenedor.longitud], {
      draggable: true // Permite arrastrar el marcador
    }).addTo(map);
    contenedorMarker.on('dragend', (event) => {
      const markerLatLng = event.target.getLatLng();
      this.form.patchValue({
        latitud: markerLatLng.lat,
        longitud: markerLatLng.lng
      });
    });
          console.log('Contenedor encontrado:', this.contenedor);
      },
      (error) => {
          console.error('Error al encontrar el contenedor:', error);
      }
  );
    this.form = new FormGroup({
      nombre_contenedor:  new FormControl('', [ Validators.required]),
      latitud: new FormControl('', [ Validators.required]),
      longitud: new FormControl('', [ Validators.required ]),
      fecha_modificacion: new FormControl(fechaActual),
      tipo: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.contenedorService.update(this.idKmlContenedor,this.id, this.form.value).subscribe(res => {
         console.log('Contenedor updated successfully!');
         this.router.navigateByUrl(`kml-Contenedor/index/${this.idKmlContenedor}/contenedor/index`);
        })
  }

}
