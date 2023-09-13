import { Component, AfterViewInit } from '@angular/core';
import { Map, tileLayer, marker, Marker, Polyline, LatLng, LatLngBounds, LayerGroup } from 'leaflet'; // Asegúrate de importar 'polyline' y 'Polyline'
import { RutaService } from '../ruta.service';
import { switchMap } from 'rxjs/operators';
import { Ruta } from '../ruta';
import { ActivatedRoute } from '@angular/router';
import { PuntoLinea } from '../punto-linea';

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

    // Obtener los puntos de la ruta desde el servicio
    this.rutaService.getPuntosRuta(this.idKmlRuta,this.id).subscribe((puntos: PuntoLinea[]) => {
      const coordinates: LatLng[] = puntos.map((punto: PuntoLinea) => {
        return new LatLng(punto.latitud, punto.longitud);
      });
    
      // Crear una Polyline con las coordenadas y agregarla al mapa
      this.rutaPolyline = new Polyline(coordinates, {
        color: 'blue',
        weight: 5,
        opacity: 0.7
      }).addTo(this.map);
    
      // Ajustar la vista del mapa para que se centre en la ruta
      this.map.fitBounds(this.rutaPolyline.getBounds());
    });

    this.rutaService.find(this.idKmlRuta, this.id).subscribe(
      (ruta: Ruta) => {
        const { latitud_inicio, longitud_inicio, latitud_fin, longitud_fin, nombre_ruta, codigo_carro } = ruta;
    
        // Crear marcador de inicio
        const inicioMarker = marker([latitud_inicio, longitud_inicio])
          .addTo(this.map)
          .bindPopup(nombre_ruta + ' ' + codigo_carro + ' ' + 'INICIO')
          .openPopup();
    
        // Crear marcador de fin
        const finMarker = marker([latitud_fin, longitud_fin])
          .addTo(this.map)
          .bindPopup(nombre_ruta + ' ' + codigo_carro + ' ' + 'FIN')
          .openPopup();
      },
      (error) => {
        console.error('Error al obtener los datos del marcador:', error);
      }
    );
  }
}
