import { Component, AfterViewInit } from '@angular/core';
import { Map, tileLayer, marker, Marker } from 'leaflet';
import { ContenedorService } from '../contenedor.service';
import { Contenedor } from '../contenedor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit {
  idKmlContenedor: number = 0;
  contenedores: Contenedor[] = [];

  constructor(
    public contenedorService: ContenedorService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.idKmlContenedor = this.route.snapshot.params['idKmlContenedor'];

    const map = new Map('map').setView([-17.3936114, -66.1568983], 13);

    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);

    this.contenedorService.getAll(this.idKmlContenedor).subscribe(
      (contenedores: Contenedor[]) => {
        this.contenedores = contenedores;
        this.contenedores.forEach((contenedor: Contenedor) => {
          const { latitud, longitud, nombre_contenedor, tipo } = contenedor;
          marker([latitud, longitud])
            .addTo(map)
            .bindPopup(nombre_contenedor + tipo)
            .openPopup();
          console.log('Marcador agregado:', nombre_contenedor,tipo);
        });
      },
      (error) => {
        console.error('Error al obtener los datos del marcador:', error);
      }
    );
  }
}
