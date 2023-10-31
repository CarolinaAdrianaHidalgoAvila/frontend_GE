import { Component, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { Map, tileLayer, marker, Marker } from 'leaflet';
import { ContenedorService } from '../contenedor.service';
import { switchMap } from 'rxjs/operators';
import { Contenedor } from '../contenedor';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  id!: number;
  idKmlContenedor: number = 0;
  @ViewChild('map') mapElement!: ElementRef;
  constructor(
    public contenedorService: ContenedorService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const idKmlContenedor = params['idKmlContenedor'];
    });
  }

  ngAfterViewInit(): void {
    this.id = this.route.snapshot.params['idContenedor'];
    this.idKmlContenedor = this.route.snapshot.params['idKmlContenedor'];

    const map = new Map('map').setView([-17.3936114, -66.1568983], 13);

    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);

    this.contenedorService.find(this.idKmlContenedor, this.id).subscribe(
      (contenedor: Contenedor) => {
        const { latitud, longitud, nombre_contenedor,tipo } = contenedor;
        marker([latitud, longitud])
          .addTo(map)
          .bindPopup("<strong>Nombre Contenedor:</strong> " + nombre_contenedor + "<br/><strong>Tipo:</strong> " + tipo)
          .openPopup();
          map.setView([latitud, longitud], 15);
        console.log('Marcador agregado:', nombre_contenedor,tipo);
      },
      (error) => {
        console.error('Error al obtener los datos del marcador:', error);
      }
    );
    
  }
}
