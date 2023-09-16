import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenedorRoutingModule } from './contenedor-routing.module';
import { IndexContenedorComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsComponent } from './maps/maps.component';

import { ComponentesModule } from '../componentes/componentes.module';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet

@NgModule({
  declarations: [
    IndexContenedorComponent,
    EditComponent,
    MapComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    ContenedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    //LeafletModule,
  ]
})
export class ContenedorModule { }
