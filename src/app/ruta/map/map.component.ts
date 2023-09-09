import { Component, AfterViewInit } from '@angular/core';
import { Map, tileLayer, marker, Marker, polyline, Polyline,  LatLngExpression } from 'leaflet'; // Asegúrate de importar 'polyline' y 'Polyline'
import { RutaService } from '../ruta.service';
import { switchMap } from 'rxjs/operators';
import { Ruta } from '../ruta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  id!: number;
  idKmlRuta: number = 0;
  map!: Map;
  rutaPolyline!: Polyline; // Para mantener una referencia a la línea de ruta

  constructor(
    public rutaService: RutaService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.id = this.route.snapshot.params['idRuta'];
    this.idKmlRuta = this.route.snapshot.params['idKmlRuta'];

    // Crear el mapa y establecer la vista
    this.map = new Map('map').setView([-17.3936114, -66.1568983], 13);

    // Agregar capa de azulejos de OpenStreetMap
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(this.map);
  }
}